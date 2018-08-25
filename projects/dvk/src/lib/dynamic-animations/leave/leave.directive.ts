import { trigger, transition, animate, style } from '@angular/animations';
import { Directive, HostBinding } from '@angular/core';

/**
 * This directive is a stub to handle :leave animations specified
 * dynamically.  Angular will remove an element without waiting for 
 * a dynamic animation to run but will wait for a static one.  So we
 * define a stub :leave animation that does nothing but plays for the
 * amount of time needed for the specified dynamic :leave.
 * 
 * Currently this is under development and is hard coded to wait 
 * for 500ms no matter how long the dynamic animation takes. 
 * Eventually it will configure the wait time based on the actual
 * dynamic animation's timing.
 * 
 * See {@link DynamicAnimationsDirective} for usage.
 */
@Directive({
  selector: '[dvkLeave]'
})
export class LeaveDirective {
  @HostBinding("@dvkLeave") public timingParams: any = null;
  
  public setLeaveTiming(timing: string): void {
    this.timingParams = dvkLeaveTiming(timing);
  }
}

/**
 * Stub animation for the :leave transition
 */
export const dvkLeave =  [
  trigger("dvkLeave", [
    transition(":leave", 
      animate("{{ timing }}"), 
        { params: { timing: "0ms" }})
  ])
]

/**
 * Stub function for setting the timing of a 
 * :leave transition
 * @param timing The timing the animation should
 * last.
 */
export function dvkLeaveTiming(timing: any) {
  return { value: null, params: { timing } };
}
