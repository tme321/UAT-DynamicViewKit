import { Injectable } from '@angular/core';
import { AnimationStateMetadata } from '@angular/animations';
import { AnimationStylesMap } from '../animation-transitions/animation-transitions.model';

@Injectable({
  providedIn: 'root'
})
export class NgStateService {
  constructor() { }

  parseStates(states: AnimationStateMetadata[]): AnimationStylesMap {
    return states.reduce((map,state)=>{
      map[state.name] = state.styles;
      return map;
    },{});
  }
}
