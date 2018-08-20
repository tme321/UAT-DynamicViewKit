import { DynamicAnimationsHandler } from './dynamic-animations-handler.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';

/**
 * The shape of a constructor for an object that can act as the Animations Handler.
 */
export interface DynamicAnimationsHandlerConstructor {
    new( 
        element: any,
        initialState: string,
        transitions: AnimationTransitionsMap,
        styles: AnimationStylesMap,
        cssMap: StateCSSMap,
        cssMapperService: StateCssMapperService,
        animationStatesBuilder: AnimationStatesService):DynamicAnimationsHandler;
}