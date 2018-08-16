import { InjectionToken } from '@angular/core';
import { DynamicAnimationsHandlerConstructor } from './dynamic-animations-handler.constructor';

/**
 * Token for injecting the constructor for an object that can
 * act as the Animations Handler
 */
export const DynamicAnimationsHandlerConstructorToken = 
    new InjectionToken<DynamicAnimationsHandlerConstructor>('DynamicAnimationsHandlerConstructorToken');