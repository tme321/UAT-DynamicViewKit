import { AnimationMetadata, AnimationStyleMetadata } from "@angular/animations";

/**
 * A map of states and {@link @angular/animations#AnimationMetadata}.
 * The top level keys are the strings representing the states
 * a transition starts from.  The inner keys are the strings 
 * representing the state being transitioned to.  Each fromState 
 * can have an animation defined for any number of toStates 
 * to play when that particular transition occurs.
 * 
 * @example
 * {
 *   'open': { 
 *     'closed': [
 *       style({ 
 *         transform: `scaleY(1.0)`, 
 *         'transform-origin': 'top' 
 *       }),
 *       animate('500ms', 
 *         style({ 
 *           transform: `scaleY(0.0)`, 
 *           'transform-origin': 'top' 
 *       }))
 *   ]},
 *   'closed': { 
 *     'open':  [
 *       style({ 
 *         transform: `scaleY(0.0)`, 
 *         'transform-origin': 'top' 
 *       }),
 *       animate('500ms', 
 *         style({ 
 *           transform: `scaleY(1.0)`, 
 *           'transform-origin': 'top' 
 *       }))
 *   ]}
 * }
 */
export interface AnimationTransitionsMap {
  [fromState: string]: {
    [toState: string]: AnimationMetadata | AnimationMetadata[];
  }
} 

export interface AnimationTransitions {
  initial?: AnimationStyleMetadata;
  transitions?: AnimationTransitionsMap;
}
