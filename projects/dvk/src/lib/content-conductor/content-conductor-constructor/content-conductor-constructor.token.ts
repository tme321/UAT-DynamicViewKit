import { InjectionToken } from '@angular/core';
import { ContentConductorConstructor } from './content-conductor-constructor.model';

/**
 * An injection token representing an implementation of a 
 * constructor in the shape of {@link ContentConductorConstructor}.
 */
export const ContentConductorConstructorToken = 
    new InjectionToken<ContentConductorConstructor>('ContainersConductorConstructorToken');