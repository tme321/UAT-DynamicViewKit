/**
 * Constrain a set of keys from type T
 * that are of type C.
 */
export type TypedKeys<T,C> = {
    [K in keyof T]: T[K] extends C ? K : never
}[keyof T];
  