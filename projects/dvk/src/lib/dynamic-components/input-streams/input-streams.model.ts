import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NotTypedKeys } from "../../common/not-typed-keys.model";

/**
 * A map of Observables whose keys are 
 * any properties of type T that are not 
 * {@link EventEmitter}s.
 */
export type InputStreams<T> = {
    [K in NotTypedKeys<T, EventEmitter<any>>]?: 
      T[K] extends EventEmitter<any> ? never : Observable<T[K]>;
};