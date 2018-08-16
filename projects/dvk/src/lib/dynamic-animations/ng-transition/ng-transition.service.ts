import { Injectable } from '@angular/core';
import { AnimationTransitionMetadata } from '@angular/animations';
import { AnimationTransitions, AnimationTransitionsMap } from '../animation-transitions/animation-transitions.model';
import { NgTransitionSymbols } from './ng-transition.symbols';
import { NgTransitionStates } from './ng-transition.states';

@Injectable()
export class NgTransitionService {
  
  constructor() { }

  buildAnimationTransitions(transitions: AnimationTransitionMetadata[]) {
    return transitions.reduce<AnimationTransitionsMap>((transMap: AnimationTransitionsMap, transition)=>{
      let newTransitions = this.parseTransitionExpression(transition);
      Object.keys(newTransitions).forEach(fromState=>{
        Object.keys(newTransitions[fromState]).forEach(toState=>{
          transMap[fromState] = transMap[fromState] || {};
          transMap[fromState][toState] = newTransitions[fromState][toState];
        })
      });
      /*
      transMap = { 
        //...transMap,
        ...transMap, 
        ...this.parseTransitionExpression(transition) 
      };
      */
      return transMap;
    },{});
  }

  parseTransitionExpression(transition: AnimationTransitionMetadata) {
    const expressions = transition.expr;
    let transitions: AnimationTransitionsMap = {};

    if(this.isString(expressions)) {
      expressions.split(',').forEach(expression=>{
        if(expression.includes(NgTransitionSymbols.Either)) {
          const states = expression.split(NgTransitionSymbols.To);
          const state1 = states[0].trim();
          const state2 = states[1].trim();

          transitions = {
            ...transitions,
            [state1]: {
              ...transitions[state1],
              [state2]:transition.animation
            },
            [state2]: {
              ...transitions[state2],
              [state1]:transition.animation
            }
          };
        }
        else if(expression.includes(NgTransitionSymbols.To)) {
          const states = expression.split(NgTransitionSymbols.To);
          const fromState = states[0].trim();
          const toState = states[1].trim();

          transitions = {
            ...transitions,
            [fromState]: {
              ...transitions[fromState],
              [toState]:transition.animation
            }
          };
        }
        else if(expression.includes(NgTransitionSymbols.Enter)) {
          transitions = {
            ...transitions,
            [NgTransitionStates.Void]: {
              ...transitions[NgTransitionStates.Void],
              [NgTransitionStates.WildCard]:transition.animation
            }
          };
        }
        else if(expression.includes(NgTransitionSymbols.Leave)) {
          transitions = {
            ...transitions,
            [NgTransitionStates.WildCard]: {
              ...transitions[NgTransitionStates.WildCard],
              [NgTransitionStates.Void]:transition.animation
            }
          };
        }
        else if(expression.includes(NgTransitionSymbols.Inc)) {
          console.error(`${expression} is not yet supported`);
        }
        else if(expression.includes(NgTransitionSymbols.Dec)) {
          console.error(`${expression} is not yet supported`);
        }
      })
    }
    return transitions;
  }
  
  private isString(expression: any): expression is string {
    return expression.length !== null && expression.length !== undefined;
  }
}
