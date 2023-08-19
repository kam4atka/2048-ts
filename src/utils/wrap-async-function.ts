export function wrapAsyncFunction<Args extends unknown[]>(
  fn: (...args: Args) => Promise<unknown>
): (...args: Args) => void {
  return (...args) => {
    void fn(...args);
  };
}
