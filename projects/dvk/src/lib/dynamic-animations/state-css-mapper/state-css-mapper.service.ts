import { Injectable, RendererFactory2 } from '@angular/core';
import { StateCSSMapper } from './state-css-mapper.model';
import { StateCSSMap } from '../state-css-map/state-css-map.model';

/**
 * This service creates a closure that handles 
 * adding and removing css classes form a given element
 * based on the {@link StateCSSMap}.
 */
@Injectable()
export class StateCssMapperService {

  constructor(private rendererFactory: RendererFactory2) {
  }

  /**
   * Get the css class for the given state.
   * 
   * @param state The state.
   * @param map The StateCSSMap to look the state up in.
   */
  getCSSClass(state:string, map: StateCSSMap) {
    return map && map[state];
  }

  /**
   * Create the {@link StateCSSMapper} to apply to the given element.
   * 
   * @param element The element to apply the css classes to.
   * @param map The StateCSSMap that defines the css classes and states.
   */
  createStateCSSMapper(element: any, map: StateCSSMap) {
    let renderer = this.rendererFactory.createRenderer(element,null);

    return <StateCSSMapper>{
      remove: (state:string)=> {
        renderer.removeClass(element,this.getCSSClass(state,map));
      },
      add: (state:string)=> {
        renderer.addClass(element,this.getCSSClass(state,map));
      },
      removeAll: ()=> {
        Object.keys(map).forEach(entry=>renderer.removeClass(element, map[entry]));
      },
      destroy: ()=> {
        renderer.destroy();
        renderer = null;
      }
    }
  }
}
