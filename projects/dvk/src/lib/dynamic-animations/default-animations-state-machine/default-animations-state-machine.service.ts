import { animate } from '@angular/animations';
import { AnimationPlayer, AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationPlayers } from '../animation-players/animation-players.model';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';

export class DefaultAnimationsStateMachine implements AnimationStateMachine {
  private players;
  private currentState: string;
  private currentPlayer: AnimationPlayer;

  constructor(
    private element: any, 
    private transitions: AnimationTransitions,
    private builder: AnimationBuilder) { 
      this.players = this.buildPlayers(this.element, this.transitions);
  }

  init(state:string, mapper: StateCSSMapper = null) { 
    this.currentState = state;

    if(mapper) {
      mapper.add(this.currentState);
    }

    this.setInitialState();
  }

  next(nextState: string, mapper: StateCSSMapper = null) {
    if(this.currentState !== nextState) {

      const newPlayer = this.getPlayer(
        this.currentState, 
        nextState, 
        this.players);

      if(this.currentPlayer) {
        this.currentPlayer.reset();
      }

      if(newPlayer) {
        this.currentPlayer = newPlayer;

       /*
        * Reseting the player clears the callbacks
        * so reregister them each time before playing.
        */
        this.currentPlayer.onStart(
          this.onAnimationStart(this.currentState, mapper));
        this.currentPlayer.onDone(
          this.onAnimationDone(nextState,mapper));

        this.currentPlayer.play();
      } 
      /*
        * In case an animation isn't defined for
        * the transition but a css class is handle
        * that by explicitly swapping out  the css 
        * classes when the transition player doesn't 
        * exist.
        */
      else {
        if(mapper) {
          mapper.remove(this.currentState);
          mapper.add(nextState); 
        }
      } 

      this.currentState = nextState;
    }
    return this.currentState;
  }

  destroy() {
    this.destroyAllPlayers(this.players);
    this.currentPlayer = null;
    this.currentState = null;
    this.currentPlayer = null;
    this.players = null;
  }


  /**
   * Build a group of [Animation Players]{@link @angular/animations#AnimationPlayer}.
   * 
   * @param element The element to apply the animations to.
   * @param transitions The map of state transition animations for the element.
   * @returns A data structure representing the transition names and animation
   * players in the shape of [AnimationPlayers]{@link AnimationPlayers}
   */
  buildPlayers(
    element: any, 
    transitions: AnimationTransitions) {

    return Object.keys(transitions.onTransitions).reduce<AnimationPlayers>(
      (players,fromState)=>{
        players[fromState] = Object.keys(transitions.onTransitions[fromState])
          .reduce<{[toState:string]: AnimationPlayer}>(
            (prev,toState)=>{
              const player = this.builder
                .build(transitions.onTransitions[fromState][toState])
                .create(element);
              prev[toState] = player; 
              return prev;
            },{});
      return players;
    },{});
  }

  /**
   * Create the callback function for an animation to 
   * execute when the animation starts.  The callback 
   * will remove the css class defined by the state 
   * and the [StateCSSMapper]{@link StateCSSMapper}.
   * 
   * @param state The string that represents the state.
   * @param mapper The [StateCSSMapper]{@link StateCSSMapper}
   * that modifies the css of an element.
   */
  onAnimationStart = (state: string, mapper: StateCSSMapper) => 
    () => {
      if(mapper) {
        mapper.remove(state);
      }
    }

 /**
   * Create the callback function for an animation to 
   * execute when the animation finishes.  The callback 
   * will add the css class defined by the state 
   * and the [StateCSSMapper]{@link StateCSSMapper}.
   * 
   * @param state The string that represents the state.
   * @param mapper The [StateCSSMapper]{@link StateCSSMapper}
   * that modifies the css of an element.
   */
  onAnimationDone = (state: string, mapper: StateCSSMapper = null) => 
    () => {
      if(mapper) {
        mapper.add(state);
      }
    }

  /**
   * Get the player for a specific transition.
   * @param fromState The current state.
   * @param toState The next state.
   * @param players The {@link AnimationPlayers} to look up the player in.
   */
  getPlayer(
    fromState: string, 
    toState: string, 
    players: AnimationPlayers) {
      return players && 
        players[fromState] && 
        players[fromState][toState];
  }

  /**
   * Destroy the {@link @angular/animations#AnimationPlayer} objects
   * inside the {@link AnimationPlayers}.
   * @param players 
   */
  destroyAllPlayers(players: AnimationPlayers) {
    if(players) {
      Object.keys(players).forEach(fromState=>{
        Object.keys(players[fromState]).forEach(toState=>{
          players[fromState][toState].destroy();
        })
      });
    }
  }

  /**
   * Set the initial state from the {@link AnimationTransitions}
   * if it is defined.
   */
  setInitialState() {
    if(this.transitions.initialStyles[this.currentState]) {
      this.builder.build(
        animate('0ms', 
          this.transitions.initialStyles[this.currentState])
      ).create(this.element).play();
    }
  }

}
