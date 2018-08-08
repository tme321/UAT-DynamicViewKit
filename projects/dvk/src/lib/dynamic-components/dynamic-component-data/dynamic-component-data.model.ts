import { InitialValues } from "../initial-values/initial-values.model";

/**
 * Represent the data necessary for a dynamic 
 * component that is suitable for serialization.
 * 
 * This part of the model is separate so that it
 * could be put inside a store or some other 
 * use case where serialization matters.
 */
export interface DynamicComponentData<T> {
    name: string;
    initialValues?: InitialValues<T>;
}