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

const getColor = (result: Row) => get<object, string, string>(result, 'properties.color.rich_text[0].plain_text', '')

const getBackgroundStyle = (result: Row) => get<object, string, string>(result, 'properties.background.rich_text[0].plain_text', '')

const getStyle = (result: Row) => ({
  color: getColor(result),
  background: getBackgroundStyle(result),
})

const getHeader = (result: Row): Header => ({
  id: result.id,
  label: getLabel(result),
  imageUrl: getImageUrl(result),
  priority: getPriority(result),
  style: getStyle(result),
})

const getBackground = (result: Row): Background => ({
  id: result.id,
  imageUrl: getImageUrl(result),
  priority: getPriority(result),
  style: getStyle(result),
})

const getLink = (result: Row): Link => ({
  id: result.id,
  label: getLabel(result),
  imageUrl: getImageUrl(result),
  url: get<object, string, string>(result, 'properties.url.url', '0'),
  priority: getPriority(result),
  style: getStyle(result),
})

const getFooter = (result: Row): Footer => ({
  id: result.id,
  imageUrl: getImageUrl(result),
  url: get<object, string, string>(result, 'properties.url.url', '0'),
  priority: getPriority(result),
  style: getStyle(result),
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
  let header: Header = {} as Header
  let background: Background = {} as Background
  let links: Link[] = []
  let footer: Footer[] = []

  results.forEach((result) => {
    if (!isInSchedule(result)) return

    const type = getType(result)

    switch (type) {
      case 'header':
        if (!header.priority || header.priority < getPriority(result)) {
          header = getHeader(result)
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
    header,
    background,
    links: links.sort((a, b) => b.priority - a.priority),
    footer: footer.sort((a, b) => b.priority - a.priority),
  }
}
