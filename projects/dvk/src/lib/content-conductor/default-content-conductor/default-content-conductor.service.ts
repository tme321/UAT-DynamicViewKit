import { QueryList, ViewRef } from '@angular/core';
import { Subscription, Observable, of, combineLatest } from 'rxjs';
import { ContentConductor } from '../content-conductor.model';
import { ContentContainer } from '../content-container/content-container.model';
import { ContainersMap } from '../containers-map/containers-map.model';
import { Content } from '../content/content.model';
import { merge, map } from 'rxjs/operators';

/**
 * The default implementation of a {@link ContentConductor}.
 * This version can be overriden by providing a different class
 * for the {@link ContentConductorConstructorToken} token.
 */
export class DefaultContentConductorService<T extends ContentContainer, U extends Content> implements ContentConductor<T> {

  constructor(
    private containersQueryLists: QueryList<T> | QueryList<T>[],
    private contentsQueryLists : QueryList<U> | QueryList<U>[]
  ) {}
    
  /**
   * @ignore
   */
  private containers: T[] = [];

  /**
   * @ignore
   */
  private contents: U[] = [];

  /**
   * @ignore
   */
  private containersMap: ContainersMap = {};

  /**
   * @ignore
   */
  private containersSub: Subscription;

  /**
   * @ignore
   */
  private contentsSub: Subscription;

  init() {
    const normalizedContainers = 
      this.normalizeQueryLists(this.containersQueryLists)

    const normalizedContents = 
      this.normalizeQueryLists(this.contentsQueryLists);

    this.listenToContainersChanges(normalizedContainers);
    this.listenToContentsChanges(normalizedContents);
  }

  destroy() {
    if(this.containersSub && !this.containersSub.closed) { 
      this.containersSub.unsubscribe(); 
    }

    if(this.contentsSub && !this.contentsSub.closed) {
      this.contentsSub.unsubscribe();
    }

    this.containersQueryLists = null;
    this.contentsQueryLists = null;
    this.containers = null;
    this.contents = null;
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

  /**
   * @ignore
   */
  private mapContainers<T extends ContentContainer>(
    containers: T[]) {
      return containers.reduce((map,container)=>{
        map[container.containerName] = container.viewContainer;
        return map;
      },{});
  }

  /**
   * @ignore
   */
  private normalizeQueryLists<T>(ql: QueryList<T>|QueryList<T>[]) {
    if(!Array.isArray(ql)) {
      return [ql];
    }
    return ql;
  }

  /**
   * @ignore
   */
  private flattenArrays<T>(arrays: T[][]) {
    return arrays.reduce((flattened,array)=>{
      flattened.push(...array);
      return flattened;
    },[])
  }

  /**
   * @ignore
   */
  private listenToContainersChanges(containers: QueryList<T>[]) {
    this.containersSub =
      combineLatest(
        containers.map<Observable<T[]>>(c=>
          of(c.toArray()).pipe(
            merge(c.changes.pipe(
              map(
                (ql:QueryList<T>)=>ql.toArray()
              ))))))
      .subscribe(containers=>{
        this.containers = this.flattenArrays(containers);
        this.containersMap = this.mapContainers(this.containers);
      });
  }

  /**
   * @ignore
   */
  private listenToContentsChanges(contents: QueryList<U>[]) {
    this.contentsSub = 
      combineLatest(
        contents.map<Observable<U[]>>(c=>
        of(c.toArray()).pipe(
          merge(c.changes.pipe(
            map((ql:QueryList<U>)=>ql.toArray())
          )))))
      .subscribe(contents=>{
          const oldContents = this.contents;
          this.contents = this.flattenArrays(contents);
          this.contents.forEach(content=>{
            if(!(oldContents.indexOf(content) >= 0)) {
              if(content.initialContainerName) {
                this.containersMap[content.initialContainerName]
                  .createEmbeddedView(content.template);
              }
            }
          })
        });
  }
    
}
