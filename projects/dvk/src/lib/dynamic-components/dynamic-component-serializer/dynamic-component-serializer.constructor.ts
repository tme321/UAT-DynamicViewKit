import { DynamicComponentSerializer } from "./dynamic-component-serializer.model";
import { DynamicComponentSerializerMap } from "../dynamic-component-serializer-map/dynamic-component-serializer-map.model";

/**
 * Definition for a component serializer constructor.
 */
export interface DynamicComponentSerializerConstructor {
    new(serializerMap: DynamicComponentSerializerMap):DynamicComponentSerializer;
}
