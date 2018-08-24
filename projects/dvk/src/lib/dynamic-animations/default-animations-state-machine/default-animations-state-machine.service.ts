import { AnimationGroupMetadata, AnimationAnimateChildMetadata, AnimationQueryMetadata, AnimationStaggerMetadata, AnimationReferenceMetadata, AnimationAnimateRefMetadata, AnimationMetadata, style, AnimationAnimateMetadata, AnimationMetadataType, AnimationStyleMetadata, animate, sequence, AnimationSequenceMetadata, AnimationKeyframesSequenceMetadata } from '@angular/animations';
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

    console.log('preparsed transitions:', transitions);
    
    let builtAnimationData: {
      sequence: AnimationSequenceMetadata,
      unstyledAnimations: AnimationAnimateMetadata[]
    }; // AnimationMetadata[];

    if(transition){
      builtAnimationData = this.parseAnimationMetadata(transition, prevStyle, newStyle);
      
      console.log('parsed transitions:', builtAnimationData);
      
      const factory = this.builder.build(builtAnimationData.sequence);
      builtAnimationData.unstyledAnimations.forEach(animation=>{
        animation.styles = null;
      });
      return factory;
    }
  }

  /**
   * 
   * @param metadata 
   * @param startStyle 
   * @param endStyle 
   */
  parseAnimationMetadata(
    metadata: AnimationMetadata | AnimationMetadata[],
    startStyle: AnimationStyleMetadata,
    endStyle: AnimationStyleMetadata): {
      sequence: AnimationSequenceMetadata,
      unstyledAnimations: AnimationAnimateMetadata[]
    } {
    const usedKeys = {};
    let normalizedAnimation: AnimationMetadata[] = [];
    this.addStyleKeys(startStyle, usedKeys);
    let parsedData: ParsedAnimationMetadata;

    if(Array.isArray(metadata)){
      metadata.forEach(md=>{
        this.parseAnimationStep(md, usedKeys);
      });
      normalizedAnimation = [...metadata]; 
    } 
    else if(this.isSequence(metadata) || this.isGroup(metadata)) {
      metadata.steps.forEach(md=>{
        this.parseAnimationStep(md, usedKeys);
      });
      normalizedAnimation = [metadata];
    }
    else {
      parsedData = this.parseAnimationStep(metadata, usedKeys);
      normalizedAnimation = [metadata];
    }

    parsedData.unStyledAnimations.forEach(animation=>{
      animation.styles = endStyle;
    });

    console.log('normalizedAnimation',normalizedAnimation);

    return {
      sequence: sequence([
        startStyle,
        ...normalizedAnimation,
        animate(1,endStyle)
      ]),
      unstyledAnimations: parsedData.unStyledAnimations
    }
    /*
    if(parsedData.unStyledAnimations) {
      parsedData.addLastStyleToAnimation.styles = endStyle;
      return sequence([startStyle, ...parsedData.animation]);
    }
    else {
      return sequence([
        startStyle, 
        ...parsedData.animation,
        animate(1,endStyle)
      ]);
    }
    */
  }

  parseAnimationStep(
    metadata: AnimationMetadata, 
    usedStyleKeys: {[key:string]:string}): ParsedAnimationMetadata {

      const unstyledAnimations: AnimationAnimateMetadata[] = [];

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
            this.parseAnimationStep(md,usedStyleKeys);
          });
          break;
        }

        case AnimationMetadataType.Sequence: {
          const amd = (metadata as AnimationSequenceMetadata);
          amd.steps.forEach(md=>{
            this.parseAnimationStep(md,usedStyleKeys);
          });
          break;
        }

        case AnimationMetadataType.Keyframes: {
          const amd = (metadata as AnimationKeyframesSequenceMetadata);
          amd.steps.forEach(md=>{
            this.parseAnimationStep(md,usedStyleKeys);
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
              this.parseAnimationStep(animation,usedStyleKeys);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys);
          }
          break;
        }
        
        case AnimationMetadataType.Stagger: {
          const amd = (metadata as AnimationStaggerMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys);
          }
          break;
        } 

        case AnimationMetadataType.AnimateRef: { 
          const amd = (metadata as AnimationAnimateRefMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys);
          }
          break;
        }

        case AnimationMetadataType.Reference: {
          const amd = (metadata as AnimationReferenceMetadata);
          if(Array.isArray(amd.animation)) {
            amd.animation.forEach(animation=>{
              this.parseAnimationStep(animation,usedStyleKeys);
            });
          }
          else {
            this.parseAnimationStep(amd.animation,usedStyleKeys);
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

    return {
      unStyledAnimations: [...unstyledAnimations],
    }
  }

  addStyleKeys(
    metadata: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata,
    allKeys: { [key:string]: string }) {
    if(this.isStyle(metadata)) {  
      Object.keys(metadata.styles).forEach(key=>{
        allKeys[key]=metadata.styles[key];
      });
    }
    else {
      allKeys = metadata.steps.reduce((allKeys,style)=>{
        Object.keys(style).forEach(key=>{
          allKeys[key]=style[key];
        });
        return allKeys;
      },allKeys);
    }
  }

  mergeStyleKeys(
    style: AnimationStyleMetadata, 
    usedKeys: { [key:string]: string }) {
    Object.keys(usedKeys).forEach(key=>{
      if(!style.styles[key]) {
        style.styles[key] = "*";
      }
    });
  }

  isStyle(metadata: AnimationStyleMetadata | AnimationKeyframesSequenceMetadata): metadata is AnimationStyleMetadata {
    return metadata.type === AnimationMetadataType.Style;
  }

  isAnimate(metadata: AnimationMetadata): metadata is AnimationAnimateMetadata {
    return metadata.type === AnimationMetadataType.Animate;
  }

  isSequence(metadata: AnimationMetadata): metadata is AnimationSequenceMetadata {
    return metadata.type === AnimationMetadataType.Sequence;
  } 

  isGroup(metadata: AnimationMetadata): metadata is AnimationGroupMetadata {
    return metadata.type === AnimationMetadataType.Group;
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

interface ParsedAnimationMetadata {
  unStyledAnimations: AnimationAnimateMetadata[];
}