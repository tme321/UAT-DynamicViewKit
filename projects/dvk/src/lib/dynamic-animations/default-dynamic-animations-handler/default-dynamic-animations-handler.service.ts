import { DynamicAnimationsHandler } from '../dynamic-animations-handler/dynamic-animations-handler.model';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';

export class DefaultDynamicAnimationsHandlerService implements DynamicAnimationsHandler {

  constructor( 
    private element: any,
    private cssMapperService: StateCssMapperService,
    private animationStatesBuilder: AnimationStatesService
) {}

  private animationsStateMachine: AnimationStateMachine;
  private cssMapper: StateCSSMapper;
  private stateCache: string = '';
  private mapCache: StateCSSMap = {};
  private transitionsCache: AnimationTransitions = {};

  setCSSMap(map: StateCSSMap) {
    if(this.mapCache !== map) {
      this.mapCache = map;

      if(this.cssMapper) {
        this.cssMapper.removeAll();
        this.cssMapper.destroy();
      }

      this.cssMapper = this.cssMapperService
        .createStateCSSMapper(this.element,this.mapCache);
    }
  }

  nextState(toState:string) {
    if(this.stateCache !== toState) {
      this.stateCache = toState;

      if(this.animationsStateMachine) {
        this.animationsStateMachine.next(
          this.stateCache, 
          this.cssMapper);
      }
    }
  }

  setTransitions(transitions: AnimationTransitions) {
    if(this.transitionsCache !== transitions) {
      this.transitionsCache = transitions;

      if(this.animationsStateMachine) {

        if(this.cssMapper) {
          this.cssMapper.removeAll();
        }

        this.animationsStateMachine.destroy();
      }    

      this.animationsStateMachine = 
        this.animationStatesBuilder
          .createAnimationStateMachine(
            this.element,
            this.transitionsCache);
    }
  }

  init() {  
    console.log('init: ',
      this.cssMapperService,
      this.animationStatesBuilder
    );


    if(this.animationsStateMachine) {
      this.animationsStateMachine.init(
        this.stateCache,
        this.cssMapper);
    }
  }

  destroy() {
    this.animationsStateMachine.destroy();
    this.cssMapper.destroy();
    this.stateCache = null;
    this.mapCache = null;
    this.transitionsCache = null;
  }
}
