import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    resetField,
  }
}
