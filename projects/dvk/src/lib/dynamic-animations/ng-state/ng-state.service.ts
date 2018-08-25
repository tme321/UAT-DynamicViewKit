import { Injectable } from '@angular/core';
import { AnimationStateMetadata } from '@angular/animations';
import { AnimationStylesMap } from '../animation-transitions/animation-transitions.model';

/**
 * Converts an array of AnimationStateMetadata objects into 
 * an {@link AnimationStylesMap}.
 */
@Injectable()
export class NgStateService {
  constructor() { }

  /**
   * Convert metadata to {@link AnimationStylesMap}
   * @param states The metadata to convert.
   */
  parseStates(states: AnimationStateMetadata[]): AnimationStylesMap {
    return states.reduce((map,state)=>{
      map[state.name] = state.styles;
      return map;
    },{});
  }
}
