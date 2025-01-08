
type UseClipboardCallback = {
  onCopied: (data: string) => void
}
export function useClipboard(callback: UseClipboardCallback = {} as UseClipboardCallback) {
  const copied = ref(false)
  const data = ref("")
  function copy(value: any) {
    data.value = value
    navigator.clipboard.writeText(value)
    copied.value = true
    callback?.onCopied?.(value)

    setTimeout(() => {
      copied.value = false
    }, 2000)
  }

  return {
    copy,
    copied,
    data
  }
}