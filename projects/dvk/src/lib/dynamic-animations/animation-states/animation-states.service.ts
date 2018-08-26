import { Injectable, Inject } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { AnimationStateMachineConstructorToken } from '../animation-state-machine/animation-state-machine.token';
import { AnimationStateMachineConstructor } from '../animation-state-machine/animation-state-machine.constructor';

/*
 * This import is necessary for proper compilation even though
 * the type isn't used in this file.
 */
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';

/**
 * This service creates an animation transition 
 * state machine with the method 
 * [createAnimationStateMachine]{@link AnimationStatesService#createAnimationStateMachine} 
 * from given {@link AnimationTransitionsMap}
 * and {@link AnimationStylesMap} objects.
 * 
 * The returned state machine is in the shape of 
 * {@link AnimationStateMachine}.
 */
@Injectable()
export class AnimationStatesService {

  constructor(
    private builder: AnimationBuilder,
    @Inject(AnimationStateMachineConstructorToken)
    private stateMachineConstructor: AnimationStateMachineConstructor) {}

  /**
   * Create an {@link AnimationStateMachine} to apply to an
   * element when the state is transitioned.
   * @param element The element to apply the animations to.
   * @param transitions The AnimationTransitionsMap to play. 
   * @param styles The AnimationStylesMap to apply.
   */
  createAnimationStateMachine(
    element: any, 
    transitions: AnimationTransitionsMap = {},
    styles: AnimationStylesMap) {

    return new this.stateMachineConstructor(
      element,
      transitions,
      styles,
      this.builder
    );
  }
}

