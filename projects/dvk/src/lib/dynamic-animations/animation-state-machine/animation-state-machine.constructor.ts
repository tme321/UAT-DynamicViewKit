import { AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from './animation-state-machine.model';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';

export interface AnimationStateMachineConstructor {
    new( 
        element: any, 
        transitions: AnimationTransitions,
        builder: AnimationBuilder):AnimationStateMachine;
}