import { Directive, Input, ElementRef } from '@angular/core';
import { DynamicAnimationsService, AnimationTransitions, DynamicAnimationsHandler, StateCSSMap } from '@uat/dvk';

/**
 * Example directive that manually uses the DynamicAnimationsService
 */
@Directive({
  selector: '[aternating-panel]'
})
export class AlternatingPanelDirective {
  private animationsHandler: DynamicAnimationsHandler;

  @Input() set cssMap (map: StateCSSMap) {
    this.animationsHandler.setCSSMap(map);
  }

  @Input() set state(toState: string) {
    this.animationsHandler.nextState(toState);
  }

  @Input() set transitions(transitions: AnimationTransitions) {
    this.animationsHandler.setTransitions(transitions);
  }

  constructor(
    private elRef: ElementRef,
    private daServ: DynamicAnimationsService,
  ) {
    this.animationsHandler = this.daServ
      .createAnimationsHandler(this.elRef.nativeElement);
  }

  ngOnInit() {  
    this.animationsHandler.init();
  }

  ngOnDestroy() {
    this.animationsHandler.destroy();
  }
  
}
