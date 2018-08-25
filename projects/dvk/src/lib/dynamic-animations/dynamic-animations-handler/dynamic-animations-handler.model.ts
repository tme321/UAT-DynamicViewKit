import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';

/**
 * Describe the interface for providing a component 
 * or directive with run time specified animations 
 * based on a series of string transitions.
 * 
 */
export interface DynamicAnimationsHandler {

    /**
     * Set the map of css classes to apply at specific states.
     */
    setCSSMap: (map: StateCSSMap) =>void;

    /**
     * Transition to the next state.
     */
    nextState: (toState:string) => void;

    /**
     * Set the animations and states to use.
     */
    setAnimations: (transitions: AnimationTransitionsMap, styles: AnimationStylesMap) => void;

    /**
     * Release the references for garbage collection.  Should 
     * usually be called in ngOnDestroy.
     */
    destroy: () => void;
}
