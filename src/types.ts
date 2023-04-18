export type Row = {
  object: 'page'
  id: string
  properties: Record<string, object>
}

export type DataBase = Row[]

export type Type = 'title' | 'background' | 'link' | 'footer'

export type Title = {
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
  title: Title
  background: Background
  links: Link[]
  footer: Footer[]
}
