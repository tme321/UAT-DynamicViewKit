import { ViewContainerRef } from '@angular/core';

/**
 * A wrapper around a ViewContainerRef
 * and a string name identifier.
 */
export interface ContentContainer {
    readonly viewContainer: ViewContainerRef;
    readonly containerName: string;
  }