import get from 'lodash/get';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { Background, DataBase, Footer, Link, LinkBio, Row, Header, Type } from '@/types';

dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const getType = (result: Row) => get<object, string, Type>(result, 'properties.type.select.name', 'link')

const getLabel = (result: Row) => get<object, string, string>(result, 'properties.label.rich_text[0].plain_text', '')

const getImageUrl = (result: Row) => get<object, string, string>(result, 'properties.image.files[0].file.url', '')

const getPriority = (result: Row) => Number(get<object, string, string>(result, 'properties.priority.number', '0'))

const getStartFrom = (result: Row) => get<object, string, string>(result, 'properties[\'start from\'].date.start', '')

const getEndAt = (result: Row) => get<object, string, string>(result, 'properties[\'end at\'].date.start', '')

const getHeader = (result: Row) => ({
  id: result.id,
  label: getLabel(result),
  imageUrl: getImageUrl(result),
  priority: getPriority(result),
})

const getBackground = (result: Row) => ({
  id: result.id,
  imageUrl: getImageUrl(result),
  priority: getPriority(result),
})

const getLink = (result: Row) => ({
  id: result.id,
  label: getLabel(result),
  imageUrl: getImageUrl(result),
  url: get<object, string, string>(result, 'properties.url.url', '0'),
  priority: getPriority(result),
})

const getFooter = (result: Row) => ({
  id: result.id,
  imageUrl: getImageUrl(result),
  url: get<object, string, string>(result, 'properties.url.url', '0'),
  priority: getPriority(result),
})

const isInSchedule = (result: Row) => {
  const startFrom = getStartFrom(result)
  const endAt = getEndAt(result)

  if (startFrom && endAt) {
    return dayjs().isBetween(startFrom, endAt)
  } else if (startFrom) {
    return dayjs().isSameOrAfter(startFrom)
  } else if (endAt) {
    return dayjs().isSameOrBefore(endAt)
  }

  return true
}

export const createLinkBio = (results: DataBase): LinkBio => {
  let title: Header = {} as Header
  let background: Background = {} as Background
  let links: Link[] = []
  let footer: Footer[] = []

  results.forEach((result) => {
    if (!isInSchedule(result)) return

    const type = getType(result)

    switch (type) {
      case 'header':
        if (!title.priority || title.priority < getPriority(result)) {
          title = getHeader(result)
        }
        break;
      case 'background':
        if (!background.priority || background.priority < getPriority(result)) {
          background = getBackground(result)
        }
        break;
      case 'link':
        links.push(getLink(result))
        break;
      case 'footer':
        footer.push(getFooter(result))
        break;
    }
  })

  return {
    title,
    background,
    links: links.sort((a, b) => b.priority - a.priority),
    footer: footer.sort((a, b) => b.priority - a.priority),
  }
}
