import { useEffect } from 'react'

const useBeforeUnloadPromptEffect = (prompt = `Are you sure you want to leave this page?`, condition) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = prompt
    }

    if (condition) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  })
}

export default useBeforeUnloadPromptEffect
