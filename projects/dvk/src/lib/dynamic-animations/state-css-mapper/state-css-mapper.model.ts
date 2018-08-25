
/**
 * The shape of an object that can map string state names 
 * to CSS classes.
 */
export interface StateCSSMapper {

  /**
   * Remove the css class defined by the {@link StateCSSMap} 
   * for the given state. 
   */
  remove: (state:string)=>void;

  /**
   * Remove all css classes defined by the {@link StateCSSMap}
   */
  removeAll: ()=>void;

  /**
   * Add the css class defined by the {@link StateCSSMap} 
   * for the given state.
   */
  add: (state:string)=> void;

  /**
   * Release the references used by the closure.
   */
  destroy: ()=> void;
}
  