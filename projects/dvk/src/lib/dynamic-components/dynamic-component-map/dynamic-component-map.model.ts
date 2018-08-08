import { ComponentConstructor } from "../component-constructor/component-constructor.model";

/**
 * A map of string names to component constructors.
 */
export interface DynamicComponentsMap {
    [serializedName:string]: ComponentConstructor;
}