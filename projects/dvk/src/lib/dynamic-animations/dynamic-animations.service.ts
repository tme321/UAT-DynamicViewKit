import { StateCSSMap } from './state-css-map/state-css-map.model';
import { AnimationTransitionsMap, AnimationStylesMap } from './animation-transitions/animation-transitions.model';
import { Injectable, Inject } from '@angular/core';
import { DynamicAnimationsHandlerConstructor } from './dynamic-animations-handler/dynamic-animations-handler.constructor';
import { DynamicAnimationsHandlerConstructorToken } from './dynamic-animations-handler/dynamic-animations-handler.token';
import { StateCssMapperService } from './state-css-mapper/state-css-mapper.service';
import { AnimationStatesService } from './animation-states/animation-states.service';

/**
 * This import is required for ts to resolve the return of 
 * the createAnimationsHandler function.  Without it compilation
 * will fail.
 */
import { DynamicAnimationsHandler } from './dynamic-animations-handler/dynamic-animations-handler.model';

/**
 * This service is used to create a {@link DynamicAnimationsHandler} 
 * with the {@link DynamicAnimationsService#createAnimationsHandler} method.
 * 
 * The {@link DynamicAnimationsHandler} 
 * can be used to handle animations based on state transitions
 * for the specified element.
 * 
 * The {@link DynamicAnimationsHandler} can be wired up to a 
 * particular component or directive to automatically handle 
 * the animations for the specified element.
 *
 */
@Injectable()
export class DynamicAnimationsService {

  constructor(
    @Inject(DynamicAnimationsHandlerConstructorToken) 
    private animationsHandlerConstructor: DynamicAnimationsHandlerConstructor,
    private cssMapperService: StateCssMapperService,
    private animationStatesBuilder: AnimationStatesService,
  ) { }

  /**
   * Create a {@link DynamicAnimationsHandler} for 
   * the given element.
   * 
   * See {@link DynamicAnimationsService} for example
   * usage.
   * 
   * @param element The element to attach the animations
   * handler to. 
   * 
   * @param initialState The initial state of the AnimationStateMachine
   * @param transitions The AnimationTransitionsMap for the AnimationStateMachine
   * @param styles The AnimationStylesMap for the AnimationStateMachine
   * @param cssMap The StateCSSMap for the AnimationStateMachine
   * 
   */
  createAnimationsHandler(
    element: any, 
    initialState: string, 
    transitions: AnimationTransitionsMap, 
    styles: AnimationStylesMap,
    cssMap: StateCSSMap = {}) {

      return new this.animationsHandlerConstructor(
        element,
        initialState,
        transitions,
        styles,
        cssMap,
        this.cssMapperService,
        this.animationStatesBuilder);
  }
}

