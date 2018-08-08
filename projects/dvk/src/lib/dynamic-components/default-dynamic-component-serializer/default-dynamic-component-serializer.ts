import { DynamicComponentSerializerMap } from '../dynamic-component-serializer-map/dynamic-component-serializer-map.model';
import { DynamicComponentSerializer } from '../dynamic-component-serializer/dynamic-component-serializer.model';
import { ComponentConstructor } from '../component-constructor/component-constructor.model';

export class DefaultDynamicComponentSerializer implements DynamicComponentSerializer {

    constructor(private serializerMap: DynamicComponentSerializerMap) {}

    getComponent<T>(componentName: string) {
        return this.serializerMap
            .deserializeMap.get(componentName);
    }

    getName(componentConstructor: ComponentConstructor) {
        return this.serializerMap
            .serializeMap.get(componentConstructor);
    }

}
