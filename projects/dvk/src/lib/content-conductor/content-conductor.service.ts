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
 * This is the service to inject into a component in order to
 * create {@link ContentConductor}s.
 * 
 * See {@link ContentConductor} for the details.
 * 
 * @method createContentConductor Create a {@link ContentConductor}
 * for moving content around a component's template,
 * 
 * @example
 * constructor(private conductorService: ContentConductorService) {}
 */
@Injectable()
export class ContentConductorService {
 
  constructor(
    @Inject(ContentConductorConstructorToken) 
    private conductorConstructor: ContentConductorConstructor) { }

  createContentConductor<T extends ContentContainer>(
    containersQueryList: QueryList<T>,
    contentsQueryList : QueryList<TemplateRef<any>>) {
    
    return  new this.conductorConstructor(
      containersQueryList,
      contentsQueryList
    );
  }
  
}
