import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';

/**
 * Describe the interface for providing a component 
 * or directive with run time specified animations 
 * based on a series of string transitions.
 * 
 * @method setCSSMap Set the map of css classes to apply at specific states.
 * @method nextState Transition to the next state.
 * @method setTransitions Set the map of animations to make on specific state 
 * transitions.
 * @method destroy Release the references for garbage collection.  Should 
 * usually be called in ngOnDestroy.
 */
export interface DynamicAnimationsHandler {
    setCSSMap: (map: StateCSSMap) =>void;
    nextState: (toState:string) => void;
    setTransitions: (transitions: AnimationTransitions) => void;
    destroy: () => void;
}
