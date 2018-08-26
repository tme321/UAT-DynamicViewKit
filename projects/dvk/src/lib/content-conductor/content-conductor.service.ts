import { Injectable, QueryList, TemplateRef, Inject } from '@angular/core';
import { ContentContainer } from './content-container/content-container.model';
import { ContentConductorConstructorToken } from './content-conductor-constructor/content-conductor-constructor.token';
import { ContentConductorConstructor } from './content-conductor-constructor/content-conductor-constructor.model';

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
 * <example-url>../../docs/injectables/ContentConductorService.html</example-url>
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
   * @param containersQueryList A query list of ContentContainers
   * @param contentsQueryList A query list of TemplateRefs.
   * @return The ContentConductor
   */
  createContentConductor<T extends ContentContainer>(
    containersQueryList: QueryList<T>,
    contentsQueryList : QueryList<TemplateRef<any>>) {
    
    return  new this.conductorConstructor(
      containersQueryList,
      contentsQueryList
    );
  }
  
}
