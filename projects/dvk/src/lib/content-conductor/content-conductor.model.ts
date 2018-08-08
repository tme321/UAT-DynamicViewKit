import { ViewRef } from '@angular/core';
import { ContentContainer } from './content-container/content-container.model';

/**
 * This is the shape of the object returned by the injectable 
 * {@link ContentConductorService} that allows content in the 
 * form of {@link TemplateRef}s supplied by a {@link QueryList} to  
 * be moved between multiple containers. 
 * 
 * The number of containers and the number of views to move between
 * them is not limited.
 * 
 * @example
 * Define multiple ContentContainers in a template:
 * 
 * <ng-container dvk-content-container="one"></ng-container>
 * <ng-container dvk-content-container="two"></ng-container>
 * 
 * Inside the component controller define queries for both the 
 * TemplateRefs and the ContentContainer implementors:
 * 
 * `@ContentChildren(ContentDirective,{ read: TemplateRef, descendants: true })` 
 * contents: QueryList<TemplateRef<any>>;
 *
 * `@ViewChildren(ContentContainerDirective)`
 * containers: QueryList<ContentContainerDirective>;
 * 
 * Inject the ContentConductorService service:
 * 
 *   constructor(
 *      private ccService: ContentConductorService) {}
 * 
 * And then create the Content Conductor once the queries are ready,
 * usually inside ngAfterViewInit:
 * 
 *   ngAfterViewInit() {
 *     this.conductor = this.ccService
 *       .createContentConductor(this.containers, this.contents);
 *     this.conductor.init(this.cont);
 *   }
 * 
 * And then move the content around with string names mapped to the
 * names of the dvk-content-container directives:
 * 
 *   moveToTwo() {
 *     this.conductor.moveViews("one","two");
 *   }
 * 
 * Or back again:
 *
 *   moveToOne() {
 *     this.conductor.moveViews("two","one");
 *   }
 *
 * And then instantiate the component or directive and put the views to
 * move around inside the element:
 * 
 * <div dvk-content-conductor-example>
 *	<span *dvk-content>Content 1</span>
 *	<span *dvk-content>Content 2</span>
 * </div>
 */
export interface ContentConductor<T extends ContentContainer> {

    /**
     * Initialize the content into the container of the given
     * string name.
     * @param initialContainer the string name of the container
     * to create the content initially inside of.  
     */
    init(initialContainer: string):void;

    /**
     *  Clean up, should be called by the component or directive's
     * {@link ngOnDestroy} method that is displaying the content. 
     */
    destroy():void;

    /**
     * Move a single {@link ViewRef} identified by it's index 
     * from one {@link ContentContainerDirective} to the another.
     * @param previousContainer The source {@link ContentContainerDirective}'s name
     * where the {@link ViewRef} is currently located.
     * @param nextContainer The destination {@link ContentContainerDirective}'s name
     * where the {@link ViewRef} will be moved to.
     * @param index The index of the {@link ViewRef} to move.
     */
    moveView( 
        previousContainer: string,
        nextContainer:string, 
        index: number):void;

    /**
     * Detach a {@link ViewRef} from a {@link ContentContainerDirective}
     * specified by it's index inside the {@link ViewContainerRef}
     * @param container The string name of the {@link ContentContainerDirective}
     * to remove the {@link ViewRef} from.
     * @param index The index of the {@link ViewRef} to remove.
     * @returns The detached {@link ViewRef}.
     */
    detachView(
        container:string,
        index?: number):ViewRef;

    /**
     * Move all of the {@link ViewRef}s from one {@link ContentContainerDirective}
     * to another.
     * @param previousContainer The {@link ContentContainerDirective} 
     * to remove the {@link ViewRef} from.
     * @param nextContainer The {@link ContentContainerDirective} 
     * to add the {@link ViewRef} to.
     */
    moveViews(
        previousContainer: string, 
        nextContainer: string):void;

    /**
     * Remove all {@link ViewRef}s from a {@link ContentContainerDirective}.
     * @param container The name of the {@link ContentContainerDirective} 
     * to remove the {@link ViewRef}s from.
     * @returns An array of the {@link ViewRef}s removed.
     */
    detachViews(container: string):ViewRef[];

    /**
     * Attach a {@link ViewRef} to a {@link ContentContainerDirective}.
     * @param container The {@link ContentContainerDirective} 
     * to attach the {@link ViewRef} to.
     * @param view The {@link ViewRef} to attach.
     */
    attachView(container:string, view: ViewRef):void;

    /**
     * Attach an array of {@link ViewRef}s to a {@link ContentContainerDirective}.
     * @param container The {@link ContentContainerDirective} 
     * to attach the {@link ViewRef}s array to.
     * @param views The {@link ViewRef}s array to attach.
     */
    attachViews(container:string, views?: ViewRef[]):void;
}