import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * A wrapper around a TemplateRef
 * and a string name identifier
 * for the initial container to put
 * the content in.
 */
export interface Content {
    readonly template: TemplateRef<any>;
    initialContainerName: string;

}