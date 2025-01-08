
import { useRouteQuery } from "@vueuse/router"
type UseRouteQueryDebounceOpts = Parameters<typeof useRouteQuery>[2] & {
  ms?: number
}
export function useRouteQueryDebounce<T>(key: string, initialValue?: T, options: UseRouteQueryDebounceOpts = {}) {
  const { ms = 500, ...routerQueryOptions } = options
  const value = useRouteQuery(key, initialValue as any, routerQueryOptions as any)
  const debouncedValue = debouncedRef(value as Ref<T>, ms)

  return debouncedValue as globalThis.Ref<T, T>
}