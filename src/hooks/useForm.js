import { useState } from 'react'

const useForm = (callback, initialState, isFormInvalid) => {
  const [values, setValues] = useState(initialState || {}),
    [invalidError, setInvalidError] = useState(null),
    [formDirty, setFormDirty] = useState(false)

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }

    if (isFormInvalid) {
      let error = isFormInvalid(values)

      if (!error) {
        callback(values)
      } else {
        setInvalidError(error)
      }

    } else {
      callback(values)
    }
  }

  const handleChange = (event) => {
    if (event && event.persist) {
      event.persist()
    }
    setValues(values =>
      ({
        ...values,
        [event.target.name]: event.target.type === 'checkbox' ?
          event.target.checked
          :
          event.target.value
      })
    )
    setFormDirty(true)
  }

  const handleChangeDirect = (name, value, resetValues) => {
    let resetObject = {}

    if (resetValues) {
      for (let resetValue of resetValues) {
        if (values.hasOwnProperty(resetValue)) {
          resetObject = {
            ...resetObject,
            [resetValue]: initialState[resetValue] || undefined,
          }
        }
      }
    }

    setValues(values =>
      ({
        ...values,
        ...resetObject,
        [name]: value
      })
    )
    setFormDirty(true)
  }

  const handleChangeDirectWithFunction = (name, valueFunction) => {
    setValues(values =>
      ({
        ...values,
        [name]: valueFunction(values[name])
      })
    )
    setFormDirty(true)
  }

  const resetForm = () => {
    setValues(initialState)
    setFormDirty(false)
  }

  return {
    handleChange,
    handleSubmit,
    values,
    handleChangeDirect,
    handleChangeDirectWithFunction,
    invalidError,
    resetForm,
    formDirty
  }
}

export default useForm
