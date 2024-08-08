'use client'

const Input = ({
  name,
  value,
  placeholder,
  onChange
}: {
  type: string
  name: string
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className='border p-2 w-full rounded-lg shadow-lg hover:shadow-xl text-black'
    ></input>
  )
}

export default Input
