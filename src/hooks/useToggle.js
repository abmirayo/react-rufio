import { useState } from "react"

const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue),
    toggleValue = () => setValue((previousValue) => !previousValue)

  return [value, setValue, toggleValue]
}

export default useToggle
