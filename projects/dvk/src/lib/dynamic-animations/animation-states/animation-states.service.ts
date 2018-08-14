import { Injectable, Inject } from '@angular/core';
import { AnimationPlayer, AnimationBuilder } from '@angular/animations';
import { AnimationTransitions } from '../animation-transitions/animation-transitions.model';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationStateMachineConstructorToken } from '../animation-state-machine/animation-state-machine.token';
import { AnimationStateMachineConstructor } from '../animation-state-machine/animation-state-machine.constructor';

/**
 * This service creates an animation transition 
 * state machine with the method 
 * [createAnimationStateMachine]{@link AnimationStatesService#createAnimationStateMachine} 
 * from a given AnimationTransitions object.
 * 
 * The returned state machine is in the shape of 
 * [AnimationStateMachine]{@link AnimationStateMachine} which consists of 3 
 * methods:
 * 
 */
@Injectable()
export class AnimationStatesService {

  constructor(
    private builder: AnimationBuilder,
    @Inject(AnimationStateMachineConstructorToken)
    private stateMachineConstructor: AnimationStateMachineConstructor) {}

  /*

  /**
   * Build a group of [Animation Players]{@link @angular/animations#AnimationPlayer}.
   * 
   * @param element The element to apply the animations to.
   * @param transitions The map of state transition animations for the element.
   * @returns A data structure representing the transition names and animation
   * players in the shape of [AnimationPlayers]{@link AnimationPlayers}
   * /
  buildPlayers(
    element: any, 
    transitions: AnimationTransitions) {

    return Object.keys(transitions).reduce<AnimationPlayers>(
      (players,fromState)=>{
        players[fromState] = Object.keys(transitions[fromState])
          .reduce<{[toState:string]: AnimationPlayer}>(
            (prev,toState)=>{
              const player = this.builder
                .build(transitions[fromState][toState])
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
   * / 
  onAnimationStart = (
    state: string, 
    mapper: StateCSSMapper = null) => () => {
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
   * /
  onAnimationDone = (
    state: string, 
    mapper: StateCSSMapper = null) => () => {
      if(mapper) {
        mapper.add(state);
      }
  }

  /**
   * Get the player for a specific transition.
   * @param fromState The current state.
   * @param toState The next state.
   * @param players The {@link AnimationPlayers} to look up the player in.
   * / 
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
   * /
  destroyAllPlayers(players: AnimationPlayers) {
    if(players) {
      Object.keys(players).forEach(fromState=>{
        Object.keys(players[fromState]).forEach(toState=>{
          players[fromState][toState].destroy();
        })
      });
    }
  }
  */

  /**
   * Create a {@link AnimationStateMachine} to apply to an
   * element when the state is transitioned.
   * @param element The element to apply the animations to.
   * @param transitions The {@link AnimationTransitions} map of 
   * the state transition animations to play.
   */
  createAnimationStateMachine(
    element: any, 
    transitions: AnimationTransitions = {}) {

    return new this.stateMachineConstructor(
      element,
      transitions,
      this.builder
    );

    /*
    let players = this.buildPlayers(element, transitions);
    let currentState: string = '';
    let currentPlayer: AnimationPlayer;

    return <AnimationStateMachine> {
        init: (state:string, mapper: StateCSSMapper = null)=> { 
          currentState = state;

          if(mapper) {
            mapper.add(currentState);
          }
        },

        next: (nextState: string, mapper: StateCSSMapper = null) => {
          if(currentState !== nextState) {

            const newPlayer = this.getPlayer(currentState, nextState,players);

            if(currentPlayer) {
              currentPlayer.reset();
            }

            if(newPlayer) {
              currentPlayer = newPlayer;

              /*
               * Reseting the player clears the callbacks
               * so reregister them each time before playing.
               * /
              currentPlayer.onStart(
                this.onAnimationStart(currentState,mapper));
              currentPlayer.onDone(
                this.onAnimationDone(nextState,mapper));

              currentPlayer.play();
            } 
            /*
             * In case an animation isn't defined for
             * the transition but a css class is handle
             * that by explicitly swapping out  the css 
             * classes when the transition player doesn't 
             * exist.
             * /
            else {
              if(mapper) {
                mapper.remove(currentState);
                mapper.add(nextState); 
              }
            } 

            currentState = nextState;
          }
          return currentState;
        },

        destroy: ()=> {
          this.destroyAllPlayers(players);
          currentPlayer = null;
          currentState = null;
          currentPlayer = null;
          players = null;
        }
    }
    */ 

  }
}

