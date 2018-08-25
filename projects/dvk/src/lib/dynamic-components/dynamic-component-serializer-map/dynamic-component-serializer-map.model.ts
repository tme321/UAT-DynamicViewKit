import { ComponentConstructor } from '../component-constructor/component-constructor.model';

/**
 * The shape of an object that can handle
 * serialization between a string name and a 
 * Component class instance.
 */
export interface DynamicComponentSerializerMap {
    serializeMap: Map<ComponentConstructor, string>;
    deserializeMap: Map<string, ComponentConstructor>;
}

