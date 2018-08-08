import { DynamicAnimationsHandler } from './dynamic-animations-handler.model';
import { AnimationStatesService } from '../animation-states/animation-states.service';
import { StateCssMapperService } from '../state-css-mapper/state-css-mapper.service';

export interface DynamicAnimationsHandlerConstructor {
    new( 
        element: any,
        cssMapperService: StateCssMapperService,
        animationStatesBuilder: AnimationStatesService):DynamicAnimationsHandler;
}