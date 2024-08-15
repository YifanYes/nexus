const PREFIX_ID = 't_'
const CODE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const isMockId = (id: string) => id.startsWith(PREFIX_ID)

const generateId = () => `${PREFIX_ID}${Math.random().toString(16).slice(2)}`

const generateCode = (length: number, prefix?: string) => {
  let result = ''
  const charactersLength = CODE_CHARACTERS.length

  for (let index = 0; index < length; index++) {
    result += CODE_CHARACTERS.charAt(Math.floor(Math.random() * charactersLength))
  }

  return prefix ? prefix + result : result
}

const Mock = {
  generateId,
  generateCode,
  isMockId
}
export default Mock
