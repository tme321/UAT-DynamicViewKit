import { AnimationGroupMetadata, AnimationAnimateChildMetadata, AnimationQueryMetadata, AnimationStaggerMetadata, AnimationReferenceMetadata, AnimationAnimateRefMetadata, AnimationMetadata, style, AnimationAnimateMetadata, AnimationMetadataType, AnimationStyleMetadata, animate, sequence, AnimationSequenceMetadata, AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { AnimationPlayer, AnimationBuilder } from '@angular/animations';
import { AnimationStateMachine } from '../animation-state-machine/animation-state-machine.model';
import { StateCSSMapper } from '../state-css-mapper/state-css-mapper.model';
import { AnimationTransitionsMap, AnimationStylesMap } from '../animation-transitions/animation-transitions.model';
import { NgTransitionStates } from '../ng-transition/ng-transition.states';

/**
 * @ignore
 */
interface DvkAnimationStepMetadata {
  unStyledAnimations: AnimationAnimateMetadata[];
}

/**
 * @ignore
 */
interface DvkAnimationMetadata extends DvkAnimationStepMetadata {
  animation: AnimationMetadata[],
  usedKeys: { [key:string]:string }
}

/**
 * @ignore
 */
interface DvkTransitionsAnimationMetadata {
  [fromState: string]: {
    [toState:string]: DvkAnimationMetadata
  }
}

/**
 * The default implementation of the {@link AnimationStateMachine} 
 * interface.  This class is provided to the {@link DynamicAnimationsHandler}
 * in order to handle the animations based on string state transitions
 * in the same way that the standard Angular Animations work. 
 */
export class DefaultAnimationsStateMachine implements AnimationStateMachine {
  private currentState: string;
  private currentTransition: AnimationPlayer;
  private currentPlayer: AnimationPlayer;
  private parsedMetadata:DvkTransitionsAnimationMetadata;

  constructor(
    private element: any, 
    private transitions: AnimationTransitionsMap,
    private styles: AnimationStylesMap,
    private builder: AnimationBuilder) { 
  }

  /**
   * Initialize the state machine.
   * @param state The initial state.
   * @param mapper The css classes to apply.
   */
  init(state:string, mapper: StateCSSMapper = null) { 
    this.currentState = state;

    this.parsedMetadata = 
      this.buildTransitionAnimationMetadata(this.transitions);

    if(mapper) {
      mapper.add(this.currentState);
    }
  }

  /**
   * Retreive the animation if one exists for the specified 
   * transitiona and play it.  Apply the css classes as specified
   * whether an animation exists or not.
   * @param nextState The state to transition to.
   * @param mapper The map of css classes to apply.
   */
  next(nextState: string, mapper: StateCSSMapper = null) {
    if(this.currentState !== nextState) {

      let player: AnimationPlayer;
      let factory = this.buildPlayer(        
        this.currentState,
        nextState
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

  /**
   * Clean up the state machine resources.
   */
  destroy() {
    if(this.currentTransition) { this.currentTransition.destroy; }
    this.currentTransition = null;
    this.currentState = null;
    this.currentTransition = null;
    this.parsedMetadata = null;
  }

  /**
   * Create the callback function for an animation to 
   * execute when the animation starts.  The callback 
   * will remove the css class defined by the state 
   * and the [StateCSSMapper]{@link StateCSSMapper}.
   * 
   * @param state The string that represents the state.
   * @param mapper The StateCSSMapper that modifies the 
   * css of an element.
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
   * @param mapper The StateCSSMapper that modifies the 
   * css of an element.
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

  /**
   * Return the metadata for a transition from one state to the next 
   * respecting wildcard (*) transitions.
   * 
   * @param fromState The state to transition from.
   * @param toState The state to transition to.
   */
  getParseAnimationMetadata(fromState: string, toState: string) {
    if(this.parsedMetadata && this.parsedMetadata[fromState]) { 
      return this.parsedMetadata[fromState][toState] ||
      this.parsedMetadata[fromState][NgTransitionStates.WildCard];
    }
    else if(this.parsedMetadata[NgTransitionStates.WildCard]) { 
      return this.parsedMetadata[NgTransitionStates.WildCard][toState] ||
      this.parsedMetadata[NgTransitionStates.WildCard][NgTransitionStates.WildCard];
    }  
  }

  /**
   * Retreive the style, if defined, for a given state.
   * @param state The state to retreive.
   */
  getStyle(state: string) {
    if(this.styles && this.styles[state]) {
      return this.styles[state];
    }
    return style({});
  }

  /**
   * Build the next animation player between 2 states.
   * If no transition is applicable transition directly
   * from the previous state to the next state.
   * 
   * NOTE: All animations will execute for 1 extra millisecond
   * to apply the final state style.
   * 
   * Using 
   * [animation_timeline_builder.ts]{@link https://github.com/angular/angular/blob/master/packages/animations/browser/src/dsl/animation_timeline_builder.ts}
   * as reference.
   * 
   * @param fromState The state to transition from.
   * @param toState The state to transition to.
   * @returns An AnimationFactory representing the desired 
   * transition animation.
   */
  buildPlayer(
    fromState: string,
    toState: string
  ) {  
    const prevStyle = this.getStyle(fromState);
    const newStyle = this.getStyle(toState);
    const parsedMetadata = this.getParseAnimationMetadata(fromState,toState);

    console.log('preparsed metadata:', parsedMetadata);

    if(parsedMetadata) {
      const usedStyleKeys = { ...parsedMetadata.usedKeys }; 
      this.addStyleKeys(prevStyle, usedStyleKeys);
      
      let toStyle = { ...newStyle, styles: newStyle.styles };
      toStyle = this.mergeStyleKeys(toStyle, usedStyleKeys)

      parsedMetadata.unStyledAnimations.forEach(animation=>{
        animation.styles = toStyle;
      });

      const factory = this.builder.build(sequence([
        prevStyle,
        ...parsedMetadata.animation,
        animate(1,toStyle)
      ]));

      parsedMetadata.unStyledAnimations.forEach(animation=>{
        animation.styles = null;
      });

      console.log('Animations built, old values should be unchanged:');
      console.log('prevStyle', prevStyle);
      console.log('newStyle', newStyle);
      console.log('parsedMetadata',parsedMetadata);

      return factory;
    }

    else {
      const usedStyleKeys = {}; 
      this.addStyleKeys(prevStyle, usedStyleKeys);
      let toStyle = { ...newStyle, styles: newStyle.styles};
      toStyle = this.mergeStyleKeys(toStyle, usedStyleKeys)

      const factory = this.builder.build(sequence([
        prevStyle,
        animate(1,toStyle)
      ]));

      return factory;
    }
  }

  /**
   * Build metadata necessary to create animations dynamically
   * that have the same behavior (I hope) of static Angular animations.
   * 
   * @param transitions An AnimationTransitionsMap of transitions
   * to build metadata from.
   */
  buildTransitionAnimationMetadata(transitions: AnimationTransitionsMap) {
    const parsedMetadata: DvkTransitionsAnimationMetadata = {};

    Object.keys(transitions).forEach(fromState=>{
      parsedMetadata[fromState] = {};
      Object.keys(transitions[fromState]).forEach(toState=>{
        parsedMetadata[fromState][toState] = 
          this.parseAnimationMetadata(transitions[fromState][toState]);
      })
    });

    return parsedMetadata;
  }

  /**
   * Parse valid transition metadata into {@link DvkAnimationMetadata}
   *  
   * @param metadata The AnimationMetadata or array of AnimationMetadata
   * that specifies the animation of a transition.
   * @returns Metadata as DvkAnimationMetadata
   */
  parseAnimationMetadata(
    metadata: AnimationMetadata | AnimationMetadata[]): DvkAnimationMetadata {
    const usedKeys = {};
    let normalizedAnimation: AnimationMetadata[] = [];
    let unstyledAnimations: AnimationAnimateMetadata[] = [];

    if(Array.isArray(metadata)) {
      metadata.forEach(md=>{
        this.parseAnimationStep(md, usedKeys, unstyledAnimations);
      });
      normalizedAnimation = metadata; 
    }
    else {
      this.parseAnimationStep(metadata, usedKeys, unstyledAnimations);
      normalizedAnimation = [metadata];
    }

    return {
      animation: normalizedAnimation,
      unStyledAnimations: unstyledAnimations,
      usedKeys: usedKeys
    }
  }

  /**
   * Parse an animation function recursively for any
   * style or keyframe[] and map all keys of those styles 
   * to the usedStyleKeys object.
   * 
   * Call itself recursively and return the animation normalized 
   * into a {@link DvkAnimationStepMetadata} object.
   * 
   * @param metadata The top level animation metadata 
   * @param usedStyleKeys An object representing all the styles 
   * used, mutated by the recursive calls.
   */
  parseAnimationStep(
    metadata: AnimationMetadata, 
    usedStyleKeys: {[key:string]:string},
    unstyledAnimations: AnimationAnimateMetadata[]) {

      switch(metadata.type) {
        case AnimationMetadataType.Animate: { 
          const amd = (metadata as AnimationAnimateMetadata);
          if(amd.styles) {   
            this.addStyleKeys(amd.styles, usedStyleKeys);
          }
          else {
            unstyledAnimations.push(amd);
          }
          break; 
        }
  
        case AnimationMetadataType.Style: { 
          const amd = (metadata as AnimationStyleMetadata);
          this.addStyleKeys(amd, usedStyleKeys);
          break; 
        }
  
        case AnimationMetadataType.Group: {
          const amd = (metadata as AnimationGroupMetadata);
          amd.steps.forEach(md=>{
            this.parseAnimationStep(md,usedStyleKeys, unstyledAnimations);
          });
          break;
        }

        case AnimationMetadataType.Sequence: {
          const amd = (metadata as AnimationSequenceMetadata);
          amd.steps.forEach(md=>{
            this.parseAnimationStep(md,usedStyleKeys, unstyledAnimations);
          });
          break;
        }

        case AnimationMetadataType.Keyframes: {
          const amd = (metadata as AnimationKeyframesSequenceMetadata);
          amd.steps.forEach(md=>{
            this.parseAnimationStep(md,usedStyleKeys, unstyledAnimations);
          });
          break;
        }
  
        case AnimationMetadataType.AnimateChild: {
          // Nothing required?
          break;
        }
         
        
        case AnimationMetadataType.Query: {
          const amd = (metadata as AnimationQueryMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys, unstyledAnimations);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys, unstyledAnimations);
          }
          break;
        }
        
        case AnimationMetadataType.Stagger: {
          const amd = (metadata as AnimationStaggerMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys, unstyledAnimations);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys, unstyledAnimations);
          }
          break;
        } 

        case AnimationMetadataType.AnimateRef: { 
          const amd = (metadata as AnimationAnimateRefMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys, unstyledAnimations);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys, unstyledAnimations);
          }
          break;
        }

        case AnimationMetadataType.Reference: {
          const amd = (metadata as AnimationReferenceMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys, unstyledAnimations);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys, unstyledAnimations);
          }
          break;
        }
  
        case AnimationMetadataType.State: {
          console.error('Error: state is not valid inside a transition.');
          break;
        }

        case AnimationMetadataType.Transition: {
          console.error('Error: transition is not valid inside a transition.');
          break;
        }

        case AnimationMetadataType.Trigger: { 
          console.error('Error: Trigger is not currently supported by the dvk.');
          break; 
        }
  
        default: { break; }
      }
  }

  /**
   * Add a set of style keys inside the passed metadata
   * into a passed object representing the styles.
   * 
   * The style keys are set to the value of '*'.
   * 
   * @param metadata The AnimationStyleMetadata or AnimationKeyframesSequenceMetadata
   * containing the styles to add.
   * @param styleKeys The object of style keys to add to.
   */
  addStyleKeys(
    metadata: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata,
    styleKeys: { [key:string]: string }) {
    if(this.isStyle(metadata)) {  
      Object.keys(metadata.styles).forEach(key=>{
        styleKeys[key]='*';
      });
    }
    else {
      styleKeys = metadata.steps.reduce((allKeys,style)=>{
        Object.keys(style).forEach(key=>{
          allKeys[key]='*';
        });
        return allKeys;
      },styleKeys);
    }
  }

  /**
   * Merge a set of style keys into a passed {@link AnimationStyleMetadata}
   * @param style The AnimationStyleMetadata to merge into
   * @param usedKeys The keys to merge in
   */
  mergeStyleKeys(
    style: AnimationStyleMetadata, 
    usedKeys: { [key:string]: string }) {
      const newStyle =  {  
        ...style,
        styles: { ...usedKeys }, 
      };
      if(!Array.isArray(style.styles) && !(style.styles as String).length) {
        Object.keys(style.styles).forEach(key=>{
          newStyle.styles[key] = style.styles[key]; 
        });
      } 
      else if(Array.isArray(style.styles)) {
        //unimplemented
        console.error('Error: Styles as arrays currently not supported');
      }
      else {
        //unimplemented, style.styles is '*'
        console.error('Error: Styles as "*" currently not supported');
      }
      console.log('new merged style:',newStyle)
      return newStyle;
  }

  /*
   * Metadata type constraint functions. 
   */

  /**
   * @ignore
   */
  isStyle(metadata: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata): metadata is AnimationStyleMetadata {
    return metadata.type === AnimationMetadataType.Style;
  }

  /**
   * @ignore
   */
  isAnimate(metadata: AnimationMetadata): metadata is AnimationAnimateMetadata {
    return metadata.type === AnimationMetadataType.Animate;
  }

  /**
   * @ignore
   */
  isSequence(metadata: AnimationMetadata): metadata is AnimationSequenceMetadata {
    return metadata.type === AnimationMetadataType.Sequence;
  } 

  /**
   * @ignore
   */
  isGroup(metadata: AnimationMetadata): metadata is AnimationGroupMetadata {
    return metadata.type === AnimationMetadataType.Group;
  } 

}

