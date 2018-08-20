import { keyframes } from '@angular/animations';
import { AnimationMetadata, style, AnimationAnimateMetadata, AnimationMetadataType, AnimationStyleMetadata, animate, sequence, AnimationSequenceMetadata } from '@angular/animations';
import { AnimationPlayer, AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { NgTransitionStates } from '../ng-transition/ng-transition.states';

export class DefaultAnimationsStateMachine implements AnimationStateMachine {
  private currentState: string;
  private currentTransition: AnimationPlayer;
  private currentPlayer: AnimationPlayer;

  constructor(
    private element: any, 
    private transitions: AnimationTransitionsMap,
    private styles: AnimationStylesMap,
    private builder: AnimationBuilder) { 
  }

  init(state:string, mapper: StateCSSMapper = null) { 
    this.currentState = state;

    if(mapper) {
      mapper.add(this.currentState);
    }
  }

  next(nextState: string, mapper: StateCSSMapper = null) {
    if(this.currentState !== nextState) {

      let player: AnimationPlayer;
      let factory = this.buildPlayer(        
        this.currentState,
        nextState,
        this.transitions,
        this.styles
      );

      if(factory) {
        player = factory.create(this.element);
      } 

      if(player) {
        if(this.currentPlayer) {
          this.currentPlayer.reset();
        }

        player.onStart(this.onAnimationStart(this.currentState, mapper));
        player.onDone(this.onAnimationDone(nextState,mapper,player));
        player.onDestroy(()=>{console.log('destroying player')});
        player.play();
        
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
    if(this.currentTransition) { this.currentTransition.destroy; }
    this.currentTransition = null;
    this.currentState = null;
    this.currentTransition = null;
  }

  /**
   * 
   * 
   * Using 
   * [animation_timeline_builder.ts]{@link https://github.com/angular/angular/blob/master/packages/animations/browser/src/dsl/animation_timeline_builder.ts}
   * as reference.
   * 
   * @param fromState 
   * @param toState 
   * @param transitions 
   * @param styles 
   */
  buildPlayer(
    fromState: string,
    toState: string, 
    transitions: AnimationTransitionsMap,
    styles: AnimationStylesMap
  ) {  
    const transition = this.getTransition(fromState,toState,transitions);
    const prevStyle = this.getStyle(fromState,styles);
    const newStyle = this.getStyle(toState,styles);
    
    let builtAnimation: AnimationMetadata[];

    if(transition){

      if(Array.isArray(transition)) {
        transition.forEach(t=>{
          
        });
      }
      else {
        builtAnimation = this.parseAnimationMetadata(transition, prevStyle, newStyle);
      }
      
      return this.builder.build(builtAnimation);
    }

    
  }

  /**
   * 
   * @param metadata 
   * @param startStyle 
   * @param endStyle 
   */
  parseAnimationMetadata(
    metadata: AnimationMetadata,
    startStyle: AnimationStyleMetadata,
    endStyle: AnimationStyleMetadata) {
    switch(metadata.type) {
      case AnimationMetadataType.Animate: { 
        const amd = (metadata as AnimationAnimateMetadata);
        if(amd.styles) {
          /*
          amd.styles = {
            ...amd.styles,
            ...endStyle,
          }
          */
         amd.styles = keyframes([
          { ...amd.styles as AnimationStyleMetadata, offset:0 },
          { ...endStyle, offset: 1 }
         ]);
          return [startStyle, amd];
        }
        else {
          return [
            startStyle, 
            {...amd, styles: endStyle } as AnimationAnimateMetadata
          ];
        }
          
        
        break; 
      }

      case AnimationMetadataType.Style: { 
        console.error(`${metadata.type} type metadata is not an animation description.`);
        break; 
      }

      case AnimationMetadataType.AnimateChild:
      case AnimationMetadataType.Group: 
      case AnimationMetadataType.Keyframes:
      case AnimationMetadataType.Query: 
      case AnimationMetadataType.Sequence:
      case AnimationMetadataType.Stagger: {
        console.error(`${metadata.type} type metadata is not currently supported by the dvk.`);
        break;
      }

      case AnimationMetadataType.AnimateRef: { break; }
      case AnimationMetadataType.Reference: { break; }

      case AnimationMetadataType.State: 
      case AnimationMetadataType.Transition: 
      case AnimationMetadataType.Trigger: { 
        console.error(`${metadata.type} type metadata is not supported by dynamic Angular animations.`);
        break; 
      }

      default: { break;}
    }
  }

  getTransition(fromState: string, toState: string, transitions: AnimationTransitionsMap) {
    if(transitions && transitions[fromState]) { 
      return transitions[fromState][toState] ||
        transitions[fromState][NgTransitionStates.WildCard];
    }
    else if(transitions[NgTransitionStates.WildCard]) { 
      return transitions[NgTransitionStates.WildCard][toState] ||
        transitions[NgTransitionStates.WildCard][NgTransitionStates.WildCard];
    }
  }

  getStyle(state: string, styles: AnimationStylesMap) {
    if(styles && styles[state]) {
      return styles[state];
    }
    return style({});
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
  onAnimationStart = (
    state: string, 
    mapper: StateCSSMapper) => 
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
  onAnimationDone = (
    state: string, 
    mapper: StateCSSMapper = null, 
    player: AnimationPlayer) => 
    () => {
      if(mapper) {
        mapper.add(state);
      }
      if(this.currentPlayer) {
        this.currentPlayer.destroy();
      }
      this.currentPlayer = player;
    }

}
