export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

export interface UserDetails {
  name: string
  email: string
  online: boolean
}

export type userItem = {
  userId: string
  email: string
  name: string
  online: boolean
}
