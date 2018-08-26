import { Injectable, Inject } from '@angular/core';
import { ComponentConstructor } from '../component-constructor/component-constructor.model';
import { DynamicComponentsMap } from '../dynamic-component-map/dynamic-component-map.model';
import { DynamicComponentSerializerMap } from '../dynamic-component-serializer-map/dynamic-component-serializer-map.model';
import { DynamicComponentSerializerConstructorToken } from './dynamic-component-serializer.token';
import { DynamicComponentSerializerConstructor } from './dynamic-component-serializer.constructor';

/*
 * This import is necessary for proper compilation even though
 * the type isn't used in this file.
 */

import { DynamicComponentSerializer } from './dynamic-component-serializer.model';

/**
 * Create a serializer for dynamic components to be resolved from 
 * string names.
 */
@Injectable()
export class DynamicComponentSerializerService {

  constructor(
    @Inject(DynamicComponentSerializerConstructorToken)
    private serializerConstructor: DynamicComponentSerializerConstructor
  ) { }

  createSerializer(map: DynamicComponentsMap) {
    const serializerMap: DynamicComponentSerializerMap = {
      serializeMap: new Map<ComponentConstructor,string>(),
      deserializeMap: new Map<string, ComponentConstructor>(),
    };

    Object.keys(map).forEach(name=>{
      serializerMap.serializeMap.set(map[name], name);
      serializerMap.deserializeMap.set(name, map[name]);
    });

    return new this.serializerConstructor(serializerMap);
  }
}
