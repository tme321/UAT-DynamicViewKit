import { AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from './animation-state-machine.model';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';

/**
 * The shape of a class constructor that can act as the animation state machine.
 */
export interface AnimationStateMachineConstructor {
    new( 
        element: any, 
        transitions: AnimationTransitionsMap,
        styles: AnimationStylesMap,
        builder: AnimationBuilder):AnimationStateMachine;
}