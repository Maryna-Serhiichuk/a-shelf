import { makeStore } from '@/store/makeStore'

export async function fetchFromApi<T>(
  endpoint: {
    initiate: (arg?: any, options?: any) => any
  },
  arg?: any
): Promise<{ data: T } | undefined> {
  const store = makeStore()

  const result = await store.dispatch(endpoint.initiate(arg))
//   result.unsubscribe?.()

  return result.data as { data: T } | undefined
}