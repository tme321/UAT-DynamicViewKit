import { DynamicAnimationsHandler } from './dynamic-animations-handler.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';

export interface DynamicAnimationsHandlerConstructor {
    new( 
        element: any,
        initialState: string,
        transitions: AnimationTransitions,
        cssMap: StateCSSMap,
        cssMapperService: StateCssMapperService,
        animationStatesBuilder: AnimationStatesService):DynamicAnimationsHandler;
}