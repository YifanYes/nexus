import Mock from '@/helpers/Mock.helper'

abstract class BaseModel {
  id: string

  constructor() {
    this.id = Mock.generateId()
  }

  abstract fromApi(data: any): BaseModel
}

export default BaseModel
