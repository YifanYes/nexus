import BaseModel from './Base.model'

class User extends BaseModel {
  id: string
  email?: string
  name?: string

  constructor(values?: any) {
    super()
    this.id = values?.id || ''
    this.email = values?.email || ''
    this.name = values?.name || ''
  }

  fromApi({ id, name, email }: { id: string; name: string; email: string }): this {
    this.id = id
    this.email = email
    this.name = name
    return this
  }
}

export default User
