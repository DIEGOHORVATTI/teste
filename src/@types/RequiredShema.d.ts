export declare global {
  type RequiredShema<T> = {
    [K in keyof T]-?: unknown
  }
}
