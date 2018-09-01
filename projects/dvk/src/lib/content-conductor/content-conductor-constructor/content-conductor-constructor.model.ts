import { QueryList } from '@angular/core';
import { ContentConductor } from "../content-conductor.model";
import { ContentContainer } from '../content-container/content-container.model';
import { Content } from '../content/content.model';

/**
 * A constructor that returns an implementation 
 * of {@link ContentConductor}.  
 * 
 * @param containersQueryList A QueryList or an array of  
 * QueryLists of ContentContainer directives or directives 
 * that extend ContentContainer the view will be put in.  
 * 
 * @param contentsQueryList A QueryList or an array of  
 * QueryLists of Content directives or directives that
 * extends Content
 */
export interface ContentConductorConstructor {
  new<T extends ContentContainer, U extends Content>(
    containersQueryLists: QueryList<T> | QueryList<T>[],
    contentsQueryLists : QueryList<U> | QueryList<U>[]
  ):ContentConductor<T>;
}
  
