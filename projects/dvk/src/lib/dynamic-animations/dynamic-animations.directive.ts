import { Directive, Input, OnInit, OnDestroy, ElementRef, NgZone, HostBinding, HostListener, Optional } from '@angular/core';
import { AnimationTransitionMetadata, transition, animate, style, trigger, AnimationStateMetadata, AnimationMetadata } from '@angular/animations';
import { StateCSSMap } from './state-css-map/state-css-map.model';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { NgTransitionService } from './ng-transition/ng-transition.service';
import { DynamicAnimationsHandler } from './dynamic-animations-handler/dynamic-animations-handler.model';
import { NgTransitionStates } from './ng-transition/ng-transition.states';
import { LeaveDirective } from './leave/leave.directive';
import { NgStateService } from './ng-state/ng-state.service';

@Directive({
  selector: '[dvk-da]'
})
export class DynamicAnimationsDirective implements OnInit, OnDestroy {
  private stateMode: 'string' | 'number' = 'string';
  private animationsHandler: DynamicAnimationsHandler;
  private strState: string;

  @Input() set state(state:string) { // | number)
    this.strState = state;

    if(this.animationsHandler) {
      this.animationsHandler.nextState(this.strState);
    }
  }

  private transitions: AnimationTransitionMetadata[];
  private states: AnimationStateMetadata[];

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

  /*
  dvkLeave = trigger('dvkLeave', [
    transition('enabled => void', 
      animate('{{ leaveTiming }}', 
      style({ /* empty * / })))
  ]);
  */


  ngOnDestroy() {

    // leave
    this.animationsHandler.nextState(NgTransitionStates.Void)
    /*
    let leaveTiming = '500ms';
    this.leaveAnimState = { 
      value: "enabled", 
      params: { leaveTiming } 
    }
    */
    
  }

  /*
  @HostListener("@dvkLeave.start")
  onLeaveTriggered() {
      if (this.leaveAnimState !== null) {
        this.animationsHandler.nextState(NgTransitionStates.Void)
      }
  }

  @HostBinding("@dvkLeave") leaveAnimState: any;
  */

}
