import { AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from './animation-state-machine.model';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';

/**
 * The shape of a class constructor that can act as the animation state machine.
 */
export interface AnimationStateMachineConstructor {
    new( 
        element: any, 
        transitions: AnimationTransitions,
        builder: AnimationBuilder):AnimationStateMachine;
}