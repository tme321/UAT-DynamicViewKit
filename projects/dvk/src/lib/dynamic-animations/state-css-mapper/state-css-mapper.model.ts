
/**
 * @method remove Remove the css class defined by the {@link StateCSSMap} 
 * for the given state. 
 * @method removeAll Remove all css classes defined by the {@link StateCSSMap}
 * @method add Add the css class defined by the {@link StateCSSMap} 
 * for the given state. 
 * @method destroy Release the references used by the closure.
 */
export interface StateCSSMapper {
    remove: (state:string)=>void;
    removeAll: ()=>void;
    add: (state:string)=> void;
    destroy: ()=> void;
  }
  