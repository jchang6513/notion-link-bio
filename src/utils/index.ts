import get from 'lodash/get';
import { Background, DataBase, Footer, Link, LinkBio, Row, Title, Type } from '@/types';

const getType = (result: Row) => get<object, string, Type>(result, 'properties.type.select.name', 'link')

const getLabel = (result: Row) => get<object, string, string>(result, 'properties.label.rich_text[0].plain_text', '')

const getImageUrl = (result: Row) => get<object, string, string>(result, 'properties.image.files[0].file.url', '')

const getPriority = (result: Row) => Number(get<object, string, string>(result, 'properties.priority.number', '0'))

const getTitle = (result: Row) => ({
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

export const createLinkBio = (results: DataBase): LinkBio => {
  let title: Title = {} as Title
  let background: Background = {} as Background
  let links: Link[] = []
  let footer: Footer[] = []

  results.forEach((result) => {
    const type = getType(result)

    switch (type) {
      case 'title':
        if (!title.priority || title.priority < getPriority(result)) {
          title = getTitle(result)
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
