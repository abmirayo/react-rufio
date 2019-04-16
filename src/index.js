import { useState } from "react"

export const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue),
        toggleValue = () => setValue((previousValue) => !previousValue)

  return [value, setValue, toggleValue]
}

export const useNumber = (initialValue = 0, increment = 1, min, max, cycle) => {
  const [value, setValue] = useState(initialValue),
        add = (number = increment) =>
          setValue((previousValue) => {
            if (previousValue === max) {
              return !!cycle ? min : previousValue
            } else {
              return previousValue + number
            }
          }),
        subtract = (number = increment) =>
          setValue((previousValue) => {
            if (previousValue === min) {
              return !!cycle ? max : previousValue
            } else {
              return previousValue - number
            }
          }),
        randomize = (cryptographicallySecure = false) => {
          const cryptoArr = new Uint8Array(1),
                range = max - min + 1,
                maxRange = 256

          window.crypto.getRandomValues(cryptoArr)

          if (cryptoArr[0] >= Math.floor(maxRange / range) * range)
            return randomize()
          return setValue(min + (cryptoArr[0] % range))
        }

  return [value, setValue, add, subtract]
}
