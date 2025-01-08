
export function debouncedRef<T>(ref: Ref<T>, ms = 200) {
  let timeout: NodeJS.Timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return ref.value
      },
      set(value) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          ref.value = value
          trigger();
        }, ms);
      }
    }
  });
}