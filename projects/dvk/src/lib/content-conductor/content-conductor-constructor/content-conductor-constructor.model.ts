import { QueryList, TemplateRef } from '@angular/core';
import { ContentConductor } from "../content-conductor.model";
import { ContentContainer } from '../content-container/content-container.model';

/**
 * A constructor that returns an implementation 
 * of {@link ContentConductor}.  
 * 
 * @param containersQueryList Should be a QueryList 
 * of containers that views can be put into.  
 * 
 * @param contentsQueryList Should be a QueryList of 
 * the TemplateRefs representing the content to 
 * display inside the containers.
 */
export interface ContentConductorConstructor {
  new<T extends ContentContainer>(
    containersQueryList: QueryList<T>,
    contentsQueryList : QueryList<TemplateRef<any>>
  ):ContentConductor<T>;
}
  
