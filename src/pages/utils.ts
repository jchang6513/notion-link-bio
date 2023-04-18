import get from 'lodash/get';
import { Background, DataBase, Footer, Link, LinkBio, Title, Type } from './types';


export const createLinkBio = (results: DataBase): LinkBio => {
  let title: Title = {} as Title
  let background: Background = {} as Background
  let links: Link[] = []
  let footer: Footer[] = []

  results.forEach((result) => {
    const type = get<object, string, Type>(result, 'properties.type.select.name', 'link')

    switch (type) {
      case 'title':
        title = {
          id: result.id,
          label: get<object, string, string>(result, 'properties.label.rich_text[0].plain_text', ''),
          imageUrl: get<object, string, string>(result, 'properties.image.files[0].file.url', ''),
          priority: Number(get<object, string, string>(result, 'properties.priority.number', '0')),
        }
        break;
      case 'background':
        background = {
          id: result.id,
          imageUrl: get<object, string, string>(result, 'properties.image.files[0].file.url', ''),
          priority: Number(get<object, string, string>(result, 'properties.priority.number', '0')),
        }
        break;
      case 'link':
        links.push({
          id: result.id,
          label: get<object, string, string>(result, 'properties.label.rich_text[0].plain_text', ''),
          imageUrl: get<object, string, string>(result, 'properties.image.files[0].file.url', ''),
          url: get<object, string, string>(result, 'properties.url.url', '0'),
          priority: Number(get<object, string, string>(result, 'properties.priority.number', '0')),
        })
        break;
      case 'footer':
        footer.push({
          id: result.id,
          imageUrl: get<object, string, string>(result, 'properties.image.files[0].file.url', ''),
          url: get<object, string, string>(result, 'properties.url.url', '0'),
          priority: Number(get<object, string, string>(result, 'properties.priority.number', '0')),
        })
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
