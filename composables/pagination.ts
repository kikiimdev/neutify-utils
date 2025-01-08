
type UsePaginationOptions = {
  prefix?: string,
  initialPage?: number
  initialTake?: number
  onChange?: (page: number, take: number, skip: number) => Promise<void> | void
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { prefix = '', initialPage = 1, initialTake = 25 } = options
  const page = useRouteQuery<number>(`${prefix}page`, initialPage, {
    transform: (v) => Number(v),
  })
  const take = useRouteQuery<number>(`${prefix}take`, initialTake, {
    transform: (v) => Number(v),
  })
  const skip = computed(() => (page.value - 1) * take.value)

  watch(skip, () => {
    options.onChange?.(page.value, take.value, skip.value)
  })

  return reactive({
    page,
    take,
    skip
  })
}