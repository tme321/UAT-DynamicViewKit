import { Directive, Input, ElementRef } from '@angular/core';
import { DynamicAnimationsService, AnimationTransitionsMap, AnimationStylesMap, DynamicAnimationsHandler, StateCSSMap } from '@uat/dvk';

/**
 * Example directive that manually uses the DynamicAnimationsService
 */
@Directive({
  selector: '[aternating-panel]'
})
export class AlternatingPanelDirective {
  private animationsHandler: DynamicAnimationsHandler;

  private cssMapCache: StateCSSMap;
  private stateCache: string;
  private transitionsCache: AnimationTransitionsMap;
  private stylesCache: AnimationStylesMap;

  @Input() set cssMap (map: StateCSSMap) {
    this.cssMapCache = map;
    if(this.animationsHandler) {
      this.animationsHandler.setCSSMap(this.cssMapCache);
    }
  }

  @Input() set state(toState: string) {
    this.stateCache = toState;
    if(this.animationsHandler) {
      this.animationsHandler.nextState(this.stateCache);
    }
  }

  @Input() set animations(animations: {
    transitions: AnimationTransitionsMap, 
    styles: AnimationStylesMap }) {
    this.transitionsCache = animations.transitions;
    this.stylesCache = animations.styles;
    if(this.animationsHandler) {
      this.animationsHandler.setAnimations(this.transitionsCache, this.stylesCache);
    }
  }

  constructor(
    private elRef: ElementRef,
    private daServ: DynamicAnimationsService,
  ) {}

  ngOnInit() {  
    this.animationsHandler = this.daServ
      .createAnimationsHandler(
        this.elRef.nativeElement,
        this.stateCache,
        this.transitionsCache,
        this.stylesCache,
        this.cssMapCache
      );
  }

  ngOnDestroy() {
    this.animationsHandler.destroy();
  }
  
}
