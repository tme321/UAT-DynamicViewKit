import { InjectionToken } from '@angular/core';
import { AnimationStateMachineConstructor } from './animation-state-machine.constructor';

/**
 * Token for the class to be constructed to act as the animation state machine.
 */
export const AnimationStateMachineConstructorToken = 
    new InjectionToken<AnimationStateMachineConstructor>('AnimationStateMachineConstructorToken');