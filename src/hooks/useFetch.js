import { useEffect, useState } from 'react'

const useFetch = (url, fetchFunction = fetch) => {
  const [data, setData] = useState(null),
    [loading, setLoading] = useState(true)

  const fetchUrl = async () => {
    const response = await fetchFunction(url)
    const json = await response.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    fetchUrl()
  }, [])
  return [data, loading]
}

export default useFetch
