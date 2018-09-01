import { ViewRef } from '@angular/core';
import { ContentContainer } from './content-container/content-container.model';

/**
 * This is the shape of the object returned by the injectable
 * {@link ContentConductorService} that allows content in the
 * form of TemplateRefs supplied by a QueryList to
 * be moved between multiple containers. 
 * 
 * The number of containers and the number of views to move between
 * them is not limited.
 * 
 */
export interface ContentConductor<T extends ContentContainer> {

    /**
     * Initialize the contents into the containers specified
     * by the directives.
     */
    init():void;

    /**
     *  Clean up, should be called by the component or directive's
     *  ngOnDestroy method that is displaying the content. 
     */
    destroy():void;

    /**
     * Move a single ViewRef identified by it's index 
     * from one {@link ContentContainerDirective} to the another.
     * @param previousContainer The source ContentContainerDirective's name
     * where the ViewRef is currently located.
     * @param nextContainer The destination ContentContainerDirective's name
     * where the ViewRef will be moved to.
     * @param fomrIndex The index of the ViewRef to move from previousContainer.
     * @param toIndex The index inside the nextContainer to insert the ViewRef.
     * If not specified the ViewRef is added to the end of the container.
     */
    moveView( 
        previousContainer: string,
        nextContainer:string, 
        fromIndex: number,
        toIndex?: number):void;

    /**
     * Detach a ViewRef from a {@link ContentContainerDirective}
     * specified by it's index inside the ViewContainerRef
     * @param container The string name of the ContentContainerDirective
     * to remove the ViewRef from.
     * @param index The index of the ViewRef to remove. If ommitted the
     * last ViewRef is removed.
     * @returns The detached ViewRef.
     */
    detachView(
        container:string,
        index?: number):ViewRef;

    /**
     * Move all of the ViewRefs from one {@link ContentContainerDirective}
     * to another.
     * @param previousContainer The ContentContainerDirective 
     * to remove the ViewRef from.
     * @param nextContainer The ContentContainerDirective 
     * to add the ViewRef to.
     * @param toIndex The index inside nextContainer to insert
     * the views, if ommitted the views are inserted at the end.
     */
    moveViews(
        previousContainer: string, 
        nextContainer: string,
        toIndex?: number):void;

    /**
     * Remove all ViewRefs from a {@link ContentContainerDirective}.
     * @param container The name of the ContentContainerDirective 
     * to remove the ViewRefs from.
     * @returns An array of the ViewRefs removed.
     */
    detachViews(container: string):ViewRef[];

    /**
     * Attach a ViewRef to a {@link ContentContainerDirective}.
     * @param container The ContentContainerDirective 
     * to attach the ViewRef to.
     * @param view The ViewRef to attach.
     * @param toIndex The index in the container to attach the view.
     * If ommitted the view is attached to the end.
     */
    attachView(container:string, view: ViewRef, toIndex?: number):void;

    /**
     * Attach an array of ViewRefs to a {@link ContentContainerDirective}.
     * @param container The ContentContainerDirective 
     * to attach the ViewRefs array to.
     * @param views The ViewRefs array to attach.
     * @param toIndex The index in the container to attach the views.
     * If ommitted the views are attached to the end.
     */
    attachViews(container:string, views?: ViewRef[], toIndex?: number):void;
}