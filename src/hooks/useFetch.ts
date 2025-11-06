import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useFetch(url: string) {
  const response = useSWR(url, fetcher)

  return response
}
