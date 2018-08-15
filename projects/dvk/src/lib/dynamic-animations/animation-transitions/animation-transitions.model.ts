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

/**
 * A mapping of state strings to {@link @angular/animations#AnimationStyleMetadata}
 * created with the {@link @angular/animations#style} function.
 * 
 * @example
 * {
 *   'closed': style({
 *     transform: `scaleY(0.0)`,
 *     'transform-origin': 'top' 
 *   }),
 *   'open': style({
 *   })
 * }
 */
export interface AnimationInitialStatesMap {
  [state: string]: AnimationStyleMetadata; 
}

/**
 * A data structure representing both the initial styles 
 * of a give state with initialStyles: {@link AnimationInitialStatesMap}
 * and a map of animations to play during transitions between 
 * states as onTransitions: {@link AnimationTransitionsMap}
 * 
 * @example
 *  const transitions: AnimationTransitions = {
 *    initialStyles: {
 *      'closed': style({ 
 *        transform: `scaleY(0.0)`,
 *        'transform-origin': 'top' 
 *      }),
 *      'open': style({
 *      })
 *    },
 *    onTransitions: {
 *      'open': { 'closed':  [
 *        style({ 
 *          transform: `scaleY(1.0)`,
 *          height: '250px',         
 *          'transform-origin': 'top' 
 *        }),
 *        animate('500ms', 
 *          style({ 
 *            transform: `scaleY(0.0)`, 
 *            height: '250px',            
 *            'transform-origin': 'top' 
 *        }))
 *      ]},
 *      'closed': { 'open':  [
 *        style({ 
 *          transform: `scaleY(0.0)`,
 *          height: '250px', 
 *          'transform-origin': 'top' 
 *        }),
 *        animate('500ms', 
 *          style({ 
 *            transform: `scaleY(1.0)`, 
 *            height: '250px',          
 *            'transform-origin': 'top' 
 *        }))
 *      ]},
 *    }
 *  };
 */
export interface AnimationTransitions {
  initialStyles?: AnimationInitialStatesMap;
  onTransitions?: AnimationTransitionsMap;
}
