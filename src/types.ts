export type Row = {
  object: 'page'
  id: string
  properties: Record<string, object>
}

export type DataBase = Row[]

export type Type = 'header' | 'background' | 'link' | 'footer'

type Style = {
  color: string
  background: string
}

export type Header = {
  id: string
  label: string
  imageUrl: string
  priority: number
  style: Style
}

export type Background = {
  id: string
  imageUrl: string
  priority: number
  style: Style
}

export type Link = {
  id: string
  label: string
  imageUrl: string
  url: string
  priority: number
  style: Style
}

export type Footer = {
  id: string
  imageUrl: string
  url: string
  priority: number
  style: Style
}

export type LinkBio = {
  header: Header
  background: Background
  links: Link[]
  footer: Footer[]
}
