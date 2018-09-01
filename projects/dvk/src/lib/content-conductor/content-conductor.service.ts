import { Injectable, QueryList, Inject } from '@angular/core';
import { ContentContainer } from './content-container/content-container.model';
import { ContentConductorConstructorToken } from './content-conductor-constructor/content-conductor-constructor.token';
import { ContentConductorConstructor } from './content-conductor-constructor/content-conductor-constructor.model';
import { Content } from './content/content.model';

/*
 * Even though this import is not used it is required for typescript
 * to resolve the return type of the createContentConductor method.
 * If it is removed this service will not compile correctly.
 */
import { ContentConductor } from './content-conductor.model';

/**
 * This service can be injected into a component in order to
 * create a {@link ContentConductor}.
 * 
 * See {@link ContentConductor} for the details.
 * 
 *  
 * Example of usage:
 * <example-url>../../docs/examples/index.html#/ContentConductor</example-url>
 *
 * 
 * @example
 * constructor(private conductorService: ContentConductorService) {}
 */
@Injectable()
export class ContentConductorService {
 
  constructor(
    @Inject(ContentConductorConstructorToken) 
    private conductorConstructor: ContentConductorConstructor) { }

  /**
   * Create a {@link ContentConductor}
   * for moving content around a component's template.
   * @param containersQueryList A QueryList or array of QueryLists of 
   * ContentContainers or directives extending ContentContainer.
   * @param contentsQueryList A QueryList or array of QueryLists of Content 
   * directives or directives extending Content.
   * @return The ContentConductor
   */
  createContentConductor<T extends ContentContainer, U extends Content>(
    containersQueryList: QueryList<T> | QueryList<T>[],
    contentsQueryList : QueryList<U> | QueryList<U>[]) {
    
    return  new this.conductorConstructor(
      containersQueryList,
      contentsQueryList
    );
  }
}
