import { Directive, Input, OnInit, OnDestroy, ElementRef, Optional } from '@angular/core';
import { AnimationTransitionMetadata, AnimationStateMetadata, AnimationMetadata } from '@angular/animations';
import { StateCSSMap } from './state-css-map/state-css-map.model';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { NgTransitionService } from './ng-transition/ng-transition.service';
import { DynamicAnimationsHandler } from './dynamic-animations-handler/dynamic-animations-handler.model';
import { NgTransitionStates } from './ng-transition/ng-transition.states';
import { LeaveDirective } from './leave/leave.directive';
import { NgStateService } from './ng-state/ng-state.service';

/**
 * This directive is the main interface to dynamic animations.
 * It should be attached to the element that is to be animated.
 * 
 * ## Directions
 *
 * In a component define a string member to represent the state
 * of the Animations.  This is analogous to a trigger in normal
 * Angular animations.
 * 
 * Then define the animations as an array of state and transition
 * function calls from the Angular animations module.
 * 
 * Optionally specify a map of state names to css class names that
 * will be added and removed from the element as the animations 
 * start and finish.
 * 
 * Then pass those values into this directives state and animations
 * Inputs.
 *
 * If a :leave animation, or *=>void, is speciied you must also both
 * add the @dvkLeave directive to the element and add dvkLeave to 
 * the component as a static animation.  This step is only necessary
 * for a :leave animation. Otherwise it can be skipped.
 * 
 * The animations can then be played by changing the string bound to
 * the state Input.
 * 
 * ## Example
 * 
 * ```ts
 * \@Component({
 *              template: `
 *                  <div *ngIf="newShow"
 * 	                    	dvk-da
 *	                      @dvkLeave
 *	                    	[state]="myState"
 *	                    	[animations]="myAniamtions"
 *                        [cssMap]="myCssMap">
 *              `
 *              animations:[dvkLeave]
 * })
 * ```
 * class MyComponent {
 *              myState: string = 'closed';
 *              myAniamtions = [
 *                  state('open',style({
 *                      'transform': `scaleY(1.0)`,
 *                      'transform-origin': 'top'
 *                  })),
 *                  state('closed',style({
 *                      'transform': `scaleY(0.0)`,
 *                      'transform-origin': 'top'
 *                  })),
 *                  transition('open<=>closed',animate('200ms')),
 *                  transition(':enter',animate('200ms',
 *                      style({ 'background-color': 'green' })),
 *                  transition(':leave',animate('200ms',
 *                      style({ 'background-color': 'red' }))
 *              ]
 *              myCssMap = {
 *                  'open': 'is-open',
 *                  'closed': 'is-closed'
 *              }
 * 
 *              toggleState() {
 *                  if(this.myState === 'closed') { 
 *                      this.myState = 'open'; 
 *                   }
 *                   else { 
 *                       this.myState = 'closed'; 
 *                   }
 *              }
 * }
 * ```
 * 
 * <example-url>../../docs/examples/index.html#/DynamicAnimations</example-url>
 */
@Directive({
  selector: '[dvk-da]'
})
export class DynamicAnimationsDirective implements OnInit, OnDestroy {
  private stateMode: 'string' | 'number' = 'string';
  private animationsHandler: DynamicAnimationsHandler;
  private strState: string;

  /**
   * Changing the value of state will cause a transition 
   * and play an animation if one is defined for that state
   * change.
   */
  @Input() set state(state:string) { // | number)
    this.strState = state;

    if(this.animationsHandler) {
      this.animationsHandler.nextState(this.strState);
    }
  }

  private transitions: AnimationTransitionMetadata[];
  private states: AnimationStateMetadata[];

  /**
   * The description of the animations to play as an array 
   * of state and transition Angular animation functions.
   */
  @Input() set animations(animations: (AnimationTransitionMetadata | AnimationStateMetadata)[]) {
    this.transitions = [];
    this.states = [];

    animations.forEach(animation=>{
      if(this.isTransition(animation)) {
        this.transitions.push(animation);
      } else if (this.isState) {
        this.states.push(animation);
      }
    });
  }

  private isTransition(metaData: AnimationMetadata): metaData is AnimationTransitionMetadata {
    return !!(metaData as AnimationTransitionMetadata).animation;
  }

  private isState(metaData: AnimationMetadata): metaData is AnimationStateMetadata {
    return !!(metaData as AnimationStateMetadata).styles;
  }

  /**
   * The map of state name to css class names to apply
   * as the state changes.
   */
  @Input() cssMap: StateCSSMap;

  constructor(
    private element: ElementRef,
    private daService: DynamicAnimationsService,
    private tranService: NgTransitionService,
    private statesService: NgStateService,
    @Optional() 
    private dvkLeave: LeaveDirective) {
      if (this.dvkLeave) {
        this.dvkLeave.setLeaveTiming("500ms");
      }
     }

  ngOnInit() {

    this.animationsHandler = this.daService.createAnimationsHandler(
      this.element.nativeElement,
      NgTransitionStates.Void,
      this.tranService.buildAnimationTransitions(this.transitions),
      this.statesService.parseStates(this.states),
      this.cssMap);
      
    // enter
    this.animationsHandler.nextState(this.strState);
  }

  ngOnDestroy() {

    // leave
    this.animationsHandler.nextState(NgTransitionStates.Void)
  }
}
