import { DynamicAnimationsHandler } from '../dynamic-animations-handler/dynamic-animations-handler.model';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';

export class DefaultDynamicAnimationsHandlerService implements DynamicAnimationsHandler {

  private animationsStateMachine: AnimationStateMachine;
  private cssMapper: StateCSSMapper;

  constructor(
    private element: any,
    private state: string,
    private transitions: AnimationTransitions,
    private cssMap: StateCSSMap,
    private cssMapperService: StateCssMapperService,
    private animationStatesBuilder: AnimationStatesService
  ) {
    this.createCSSMapper(cssMap);
    this.createStateMachine(this.transitions);
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

  setTransitions(transitions: AnimationTransitions) {
    this.createStateMachine(transitions);
  }

  destroy() {
    this.animationsStateMachine.destroy();
    this.cssMapper.destroy();
    this.state = null;
    this.cssMap = null;
    this.transitions = null;
  }

  private createStateMachine(transitions: AnimationTransitions) {
    if(this.animationsStateMachine) {
      this.animationsStateMachine.destroy();
    }

    if(this.transitions !== transitions || !this.animationsStateMachine) {
      this.transitions = transitions;

      this.animationsStateMachine = 
        this.animationStatesBuilder
          .createAnimationStateMachine(
            this.element,
            this.transitions);

      this.animationsStateMachine.init(
        this.state,
        this.cssMapper);
    }
  }

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
