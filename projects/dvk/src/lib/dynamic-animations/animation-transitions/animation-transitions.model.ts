import { AnimationMetadata, AnimationStyleMetadata } from "@angular/animations";

/**
 * A map of states and AnimationMetadata. 
 * The top level keys are the strings representing the states
 * a transition starts from.  The inner keys are the strings 
 * representing the state being transitioned to.  Each fromState 
 * can have an animation defined for any number of toStates 
 * to play when that particular transition occurs.
 * 
 */
export interface AnimationTransitionsMap {
  [fromState: string]: {
    [toState: string]: AnimationMetadata | AnimationMetadata[];
  }
} 

/**
 * A mapping of state strings to AnimationStyleMetadata
 * created with the style function. 
 */
export interface AnimationStylesMap {
  [state: string]: AnimationStyleMetadata; 
}
