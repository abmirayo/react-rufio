import { useState } from "react"
import getCryptographicallySecureRandomInt from "../utils/getCryptographicallySecureRandomInt"

const useNumber = (initialValue = 0, increment = 1, min, max, cycle) => {
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
      if (cryptographicallySecure) {
        setValue(getCryptographicallySecureRandomInt(min, max))
      } else {
        setValue(Math.floor(Math.random() * (max - min + 1) + min))
      }
    }

  return [value, setValue, add, subtract, randomize]
}

export default useNumber
