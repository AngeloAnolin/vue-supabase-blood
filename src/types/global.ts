declare interface Credentials {
  email?: string | undefined
  password?: string | undefined
  provider?: 'bitbucket' | 'github' | 'gitlab' | 'google' | undefined
}

declare interface Todo {
  id?: number
  user_id: string
  task: string
  is_complete?: boolean
  inserted_at?: string
  reading: number
  uom: string
  notes?: string
}

declare interface Average {
  molar: number
  mass: number
  background: Background
}

declare interface Background {
  text: string
  backgroundClass: string
}