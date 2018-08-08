import { ComponentConstructor } from '../component-constructor/component-constructor.model';

/**
 * Handle serialization  between a string name and a component constructor.
 */
export interface DynamicComponentSerializer {
    getComponent<T>(componentName: string): ComponentConstructor;
    getName(componentConstructor: ComponentConstructor):string;
}
  