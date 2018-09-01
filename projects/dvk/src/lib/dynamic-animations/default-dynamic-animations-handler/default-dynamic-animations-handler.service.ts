import { DynamicAnimationsHandler } from '../dynamic-animations-handler/dynamic-animations-handler.model';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';

/**
 * The default implementation of {@link DynamicAnimationsHandler}
 * that provides the {@link DynamicAnimationsDirective} with 
 * animations capabllities.  
 */
export class DefaultDynamicAnimationsHandlerService implements DynamicAnimationsHandler {

  /**
   * @ignore
   */
  private animationsStateMachine: AnimationStateMachine;

  /**
   * @ignore
   */
  private cssMapper: StateCSSMapper;

  constructor(
    private element: any,
    private state: string,
    private transitions: AnimationTransitionsMap,
    private styles: AnimationStylesMap, 
    private cssMap: StateCSSMap,
    private cssMapperService: StateCssMapperService,
    private animationStatesBuilder: AnimationStatesService
  ) {
    this.createCSSMapper(cssMap);
    this.createStateMachine(this.transitions, this.styles);
  }
  
  setCSSMap(map: StateCSSMap) {
    this.createCSSMapper(map);
  }

  nextState(toState:string) {
    if(this.state !== toState) {
      this.state = toState;

      if(this.animationsStateMachine) {
        this.animationsStateMachine.next(
          this.state, 
          this.cssMapper);
      }
    }
  }

  setAnimations(transitions: AnimationTransitionsMap, styles: AnimationStylesMap) {
    this.createStateMachine(transitions, styles);
  }

  destroy() {
    this.animationsStateMachine.destroy();
    this.cssMapper.destroy();
    this.state = null;
    this.cssMap = null;
    this.transitions = null;
  }

  /**
   * @ignore
   */
  private createStateMachine(
    transitions: AnimationTransitionsMap, 
    styles: AnimationStylesMap) {
    if(this.animationsStateMachine) {
      this.animationsStateMachine.destroy();
    }

    if(this.transitions !== transitions || !this.animationsStateMachine) {
      this.transitions = transitions;

      this.animationsStateMachine = 
        this.animationStatesBuilder
          .createAnimationStateMachine(
            this.element,
            this.transitions,
            styles);

      this.animationsStateMachine.init(
        this.state,
        this.cssMapper);
    }
  }

  /**
   * @ignore
   */
  private createCSSMapper(map: StateCSSMap = {}) {
    if(this.cssMap !== map || !this.cssMapper) {
      this.cssMap = map;

      if(this.cssMapper) {
        this.cssMapper.removeAll();
        this.cssMapper.destroy();
      }

      this.cssMapper = this.cssMapperService
        .createStateCSSMapper(this.element,this.cssMap);

      this.cssMapper.add(this.state);
    }
  }
}
