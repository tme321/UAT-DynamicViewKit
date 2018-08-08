import { EventEmitter } from '@angular/core';
import { TypedKeys } from "../../common/typed-keys.model";

/**
 * A map of call back functions whose keys are 
 * properties of type T that are {@link EventEmitter}s.
 */
export type OutputCallbacks<T> = {
    [K in TypedKeys<T, EventEmitter<any>>]: 
      T[K] extends EventEmitter<infer E> ? (e: E)=>void : never;
};
  