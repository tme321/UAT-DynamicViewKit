import { AnimationPlayer } from "@angular/animations";

/**
 * A table of animations to play based on the 
 * transition between the state keys.
 * 
 * @example
 * {
 *   'open': {
 *     'closed': AnimationPlayer
 *   },
 *   'closed': {
 *     'open': AnimationPlayer
 *   }
 * }
 */
export interface AnimationPlayers {
    [fromState: string]: {
        [toState: string]: AnimationPlayer
    }
}