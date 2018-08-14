import { StateCSSMap } from './state-css-map/state-css-map.model';
import { AnimationTransitions } from './animation-transitions/animation-transitions.model';
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
 * with the {@link DynamicAnimationsService.createAnimationsHandler} method.
 * 
 * The {@link DynamicAnimationsHandler} 
 * can be used to handle animations based on state transitions
 * for the specified element.
 * 
 * The {@link DynamicAnimationsHandler} can be wired up to a 
 * particular component or directive to automatically handle 
 * the animations for the specified element.
 * 
 * @example
 * `@Directive()`
 * export class AnimatedDirective {
 *   private animationsHandler: DynamicAnimationsHandler;
 * 
 *   `@Input()` set cssMap (map: StateCSSMap) {
 *     this.animationsHandler.setCSSMap(map);
 *   }
 * 
 *   `@Input()` set state(toState: string) {
 *     this.animationsHandler.nextState(toState);
 *   }
 * 
 *   `@Input()` set transitions(transitions: AnimationTransitions) {
 *     this.animationsHandler.setTransitions(transitions);
 *   }
 * 
 *   constructor(
 *     private elRef: ElementRef,
 *     private daService: DynamicAnimationsService,
 *   ) {
 *     this.animationsHandler = this.daService
 *       .createAnimationsHandler(this.elRef.nativeElement);
 *   }
 * 
 *   ngOnInit() {  
 *     this.animationsHandler.init();
 *   }
 * 
 *   ngOnDestroy() {
 *     this.animationsHandler.destroy();
 *   }
 * }
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
   * @param initialState The initial state of the {@link AnimationStateMachine}
   * @param transitions The {@link AnimationTransitions} for the {@link AnimationStateMachine}
   * @param cssMap The {@link StateCSSMap} for the {@link AnimationStateMachine}
   * 
   */
  createAnimationsHandler(
    element: any, 
    initialState: string, 
    transitions: AnimationTransitions, 
    cssMap: StateCSSMap = {}) {

      return new this.animationsHandlerConstructor(
        element,
        initialState,
        transitions,
        cssMap,
        this.cssMapperService,
        this.animationStatesBuilder);
  }
}

