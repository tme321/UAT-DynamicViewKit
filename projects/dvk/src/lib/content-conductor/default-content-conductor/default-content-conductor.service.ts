import { QueryList, TemplateRef, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentConductor } from '../content-conductor.model';
import { ContentContainer } from '../content-container/content-container.model';
import { ContainersMap } from '../containers-map/containers-map.model';

/**
 * The default implementation of a {@link ContentConductor}.
 * This version can be overriden by providing a different class
 * for the {@link ContentConductorConstructorToken} token.
 */
export class DefaultContentConductorService<T extends ContentContainer> implements ContentConductor<T> {

  constructor(
    private containersQueryList: QueryList<T>,
    private contentsQueryList : QueryList<TemplateRef<any>>
  ) {}
    
  private containers: T[];
  private templates: TemplateRef<any>[];
  private containersMap: ContainersMap = {};
  private containersSub: Subscription;
  private contentsSub: Subscription;

  private mapContainers<T extends ContentContainer>(
    containers: T[]) {
      return containers.reduce((map,container)=>{
        map[container.containerName] = container.viewContainer;
        return map;
      },{});
  }
  
  init(initialContainer: string) {
    this.containers = this.containersQueryList.toArray();
    this.templates = this.contentsQueryList.toArray();

    this.containersMap = this.mapContainers(this.containers);
    this.containersSub = this.containersQueryList
      .changes
      .subscribe((c: T[])=>{
        this.containers = c;
        this.mapContainers(this.containers);
      });

    this.contentsSub = this.contentsQueryList
      .changes
      .subscribe((t: TemplateRef<any>[])=>{
        this.templates = t;
      });

    if(initialContainer && this.templates) {
      this.templates.map(template=>
        this.containersMap[initialContainer]
          .createEmbeddedView(template));
    }
  }

  destroy() {
    if(this.containersSub && !this.containersSub.closed) { 
      this.containersSub.unsubscribe(); 
    }

    if(this.contentsSub && !this.contentsSub.closed) {
      this.contentsSub.unsubscribe();
    }

    this.containersQueryList = null;
    this.contentsQueryList = null;
    this.containers = null;
    this.templates = null;
    this.containersMap = null;
    this.containersSub = null;
    this.contentsSub = null;
  }

  moveView( 
    previousContainer: string,
    nextContainer:string, 
    fromIndex: number,
    toIndex?: number) {
      fromIndex = fromIndex || this.containersMap[previousContainer].length;
      const insertIndex = toIndex === null || toIndex === undefined? 
        this.containersMap[nextContainer].length : 
        toIndex;

      const view = this.containersMap[previousContainer].detach(fromIndex);
      this.containersMap[nextContainer].insert(view, insertIndex);
  }

  detachView(
    container:string,
    index?: number) {
      return this.containersMap[container].detach(index);
  }

  moveViews(previousContainer: string, nextContainer: string, toIndex?: number) {
    const length = this.containersMap[previousContainer].length;
    const viewsCache: ViewRef[] = [];

    for(let i=0; i<length; i++) {
      viewsCache.push(
        this.containersMap[previousContainer].detach(0));
    }

    let insertIndex = toIndex === null || toIndex === undefined? 
      this.containersMap[nextContainer].length : 
      toIndex;

    viewsCache.forEach(view=>{
      this.containersMap[nextContainer].insert(
        view,
        insertIndex);
      insertIndex++
    });
  }

  detachViews(container: string) {
    const detachedViews = [];
    const length = this.containersMap[container].length;

    for(let x = 0; x < length; x++) {
      detachedViews.push(this.containersMap[container].detach(x));
    }

    return detachedViews;
  }

  attachViews(container:string, views: ViewRef[], toIndex?: number) {
    let insertIndex = toIndex === null || toIndex === undefined? 
      this.containersMap[container].length : 
      toIndex;

    views.forEach(view=>{
      this.containersMap[container].insert(view, insertIndex);
      insertIndex++;
    });
  }

  attachView(container: string, view: ViewRef, toIndex?: number) {
    const insertIndex = toIndex === null || toIndex === undefined? 
      this.containersMap[container].length : 
      toIndex;

    this.containersMap[container].insert(view, insertIndex);
  }
}
