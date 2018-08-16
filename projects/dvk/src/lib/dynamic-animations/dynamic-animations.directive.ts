import { Directive, Input, OnInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { AnimationTransitionMetadata } from '@angular/animations';
import { StateCSSMap } from './state-css-map/state-css-map.model';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { AnimationTransitions } from './animation-transitions/animation-transitions.model';
import { NgTransitionService } from './ng-transition/ng-transition.service';
import { DynamicAnimationsHandler } from './dynamic-animations-handler/dynamic-animations-handler.model';
import { NgTransitionStates } from './ng-transition/ng-transition.states';


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

  @Input() transitions: AnimationTransitionMetadata[];
  @Input() cssMap: StateCSSMap;

  constructor(
    private element: ElementRef,
    private daService: DynamicAnimationsService,
    private tranService: NgTransitionService,
    private zone: NgZone) { }

  ngOnInit() {

    this.animationsHandler = this.daService.createAnimationsHandler(
      this.element.nativeElement,
      NgTransitionStates.Void,
      
      { onTransitions: this.tranService.buildAnimationTransitions(this.transitions) }, 
      this.cssMap);

    // enter
    this.animationsHandler.nextState(this.strState);
  }


  ngOnDestroy() {
    // leave
    this.zone.runTask(() => this.animationsHandler.nextState(NgTransitionStates.Void))
    ;
  }

}

