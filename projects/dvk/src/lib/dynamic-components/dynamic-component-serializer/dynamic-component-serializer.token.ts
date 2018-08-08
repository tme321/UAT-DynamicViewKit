import { InjectionToken } from '@angular/core';
import { DynamicComponentSerializerConstructor } from './dynamic-component-serializer.constructor';

/**
 * This token represents the specific instance used for the
 * component serializer.
 */
export const DynamicComponentSerializerConstructorToken = 
    new InjectionToken<DynamicComponentSerializerConstructor>('DynamicComponentSerializerConstructorToken');