export type Row = {
  object: 'page'
  id: string
  properties: Record<string, object>
}

export type DataBase = Row[]

export type Type = 'header' | 'background' | 'link' | 'footer'

export type Header = {
  id: string
  label: string
  imageUrl: string
  priority: number
}

export type Background = {
  id: string
  imageUrl: string
  priority: number
}

export type Link = {
  id: string
  label: string
  imageUrl: string
  url: string
  priority: number
}

export type Footer = {
  id: string
  imageUrl: string
  url: string
  priority: number
}

export type LinkBio = {
  title: Header
  background: Background
  links: Link[]
  footer: Footer[]
}
