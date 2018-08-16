import { Injectable, Inject } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { AnimationStateMachineConstructorToken } from '../animation-state-machine/animation-state-machine.token';
import { AnimationStateMachineConstructor } from '../animation-state-machine/animation-state-machine.constructor';

/**
 * This service creates an animation transition 
 * state machine with the method 
 * [createAnimationStateMachine]{@link AnimationStatesService#createAnimationStateMachine} 
 * from a given AnimationTransitions object.
 * 
 * The returned state machine is in the shape of 
 * [AnimationStateMachine]{@link AnimationStateMachine} which consists of 3 
 * methods:
 * 
 */
@Injectable()
export class AnimationStatesService {

  constructor(
    private builder: AnimationBuilder,
    @Inject(AnimationStateMachineConstructorToken)
    private stateMachineConstructor: AnimationStateMachineConstructor) {}

  /**
   * Create a {@link AnimationStateMachine} to apply to an
   * element when the state is transitioned.
   * @param element The element to apply the animations to.
   * @param transitions The {@link AnimationTransitions} map of 
   * the state transition animations to play.
   */
  createAnimationStateMachine(
    element: any, 
    transitions: AnimationTransitions = {}) {

    return new this.stateMachineConstructor(
      element,
      transitions,
      this.builder
    );
  }
}

