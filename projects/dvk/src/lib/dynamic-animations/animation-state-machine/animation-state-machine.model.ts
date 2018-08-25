import { StateCSSMapper } from "../state-css-mapper/state-css-mapper.model";

/**
 * The shape of an animation state machine to be used by a component or
 * directive that wants to provide dynamic animations.
 * 
 */
export interface AnimationStateMachine {

  /**
   * Initialize the state and css class of the state machine.
   */
  init: (state:string, mapper?: StateCSSMapper)=>void;

  /**
   * Transition the state from the current state to the next state, 
   * playing any animations and applying any css classes as defined.
   */
  next: (nextState: string, mapper?: StateCSSMapper)=>string;

  /**
   * Release the references held by the object created for 
   * the state machine.
   */
  destroy: ()=>void;
  }
  