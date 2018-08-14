import { Input, OnInit, OnDestroy } from '@angular/core';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { DynamicAnimationsHandler } from './dynamic-animations-handler/dynamic-animations-handler.model';
import { StateCSSMap } from './state-css-map/state-css-map.model';
import { AnimationTransitions } from './animation-transitions/animation-transitions.model';

/**
 * This base class uses the {@link DynamicAnimationsService} to generate
 * a {@link DynamicAnimationsHandler} and attach it to the element 
 * passed into the super call.
 * 
 * This base class is only suitable for animating a single element.  In order 
 * to animate more consider using the {@link DynamicAnimationsService} 
 * directly and wiring up a separate instance of 
 * {@link DynamicAnimationsHandler} to each element.
 * 
 * It defines the series of inputs that can be used to control the animation
 * of the specified element.
 * 
 * @member cssMap An `@Input` for the mapping of states to css classes as a 
 * {@link StateCSSMap}.
 * @member state An `@Input` for the state as a string.
 * @member transitions An `@Input` for the map of state transitions to 
 * animations as a {@link AnimationTransitions}.
 * 
 * @example
 * `@Component()`
 * export class AlternatingPanelComponent extends DynamicAnimationsBase {
 *     constructor(
 *         protected elRef: ElementRef,
 *         protected daServ: DynamicAnimationsService,
 *     ) {
 *         super(elRef.nativeElement, daServ);
 *     }
 * }
 */
export abstract class DynamicAnimationsBase implements OnInit, OnDestroy {
    protected animationsHandler: DynamicAnimationsHandler;

    private cssMapCache: StateCSSMap;
    private stateCache: string;
    private transitionsCache: AnimationTransitions;

    @Input() set cssMap (map: StateCSSMap) {
        this.cssMapCache = map;
        if(this.animationsHandler){
            this.animationsHandler.setCSSMap(this.cssMapCache);
        }
    }
    
    @Input() set state(toState: string) {
        this.stateCache = toState;
        if(this.animationsHandler) {
            this.animationsHandler.nextState(this.stateCache);
        }
    }
    
    @Input() set transitions(transitions: AnimationTransitions) {
        this.transitionsCache = transitions;
        if(this.animationsHandler) {
            this.animationsHandler.setTransitions(this.transitionsCache);
        }
    }
     
    /**
     * DynamicAnimationsBase constructor
     * @param element The element, not ElementRef, to apply the animations to.
     * @param dynamicAnimationsService The {@link DynamicAnimationsService} to use for the animations.
     */
    constructor(
        protected element: any,
        protected dynamicAnimationsService: DynamicAnimationsService,
    ) {

        /*
         * Override the behaviour of ngOnInit and 
         * ngOnDestroy so that an inheritor of this 
         * class does not have to call the super 
         * version of each.
         */

        const onInit = this.ngOnInit;
        this.ngOnInit = () => {
            this.baseInit();
            onInit.apply(this);
        };          
  
        const onDestroy = this.ngOnDestroy;
        this.ngOnDestroy = () => {
            this.baseDestroy();
            onDestroy.apply(this);
        };          
    }

    /**
     * Implemented to satisfy OnInit, noop
     */
    ngOnInit() {  
    }

    /**
     * Implemented to satisfy OnDestroy, noop
     */
    ngOnDestroy() {
    }

    private baseInit() {
        this.animationsHandler = this.dynamicAnimationsService
            .createAnimationsHandler(
                this.element,
                this.stateCache,
                this.transitionsCache,
                this.cssMapCache);
    }

    private baseDestroy() {
        this.animationsHandler.destroy();
    }
}










