/**
 * Constrain a set of keys from type T 
 * that are not of type C.
 */
export type NotTypedKeys<T,C> = {
    [K in keyof T]: T[K] extends C ? never : K
}[keyof T];
  