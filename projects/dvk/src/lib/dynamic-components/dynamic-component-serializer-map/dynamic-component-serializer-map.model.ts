import { ComponentConstructor } from '../component-constructor/component-constructor.model';

export interface DynamicComponentSerializerMap {
    serializeMap: Map<ComponentConstructor, string>;
    deserializeMap: Map<string, ComponentConstructor>;
}

