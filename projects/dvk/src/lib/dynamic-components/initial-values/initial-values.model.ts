/**
 * A map of keys to values where 
 * the keys are properties of 
 * type T and the values are 
 * the same as the property type.
 */
export type InitialValues<T> = {
    [M in keyof T]?: T[M];
}