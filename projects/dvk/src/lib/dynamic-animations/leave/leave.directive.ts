import { trigger, transition, animate, style } from '@angular/animations';
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[dvkLeave]'
})
export class LeaveDirective {
  @HostBinding("@dvkLeave") public timingParams: any = null;
  
  public setLeaveTiming(timing: string): void {
    this.timingParams = dvkLeaveTiming(timing);
  }
}


export const dvkLeave =  [
  trigger("dvkLeave", [
    transition(":leave", 
      animate("{{ timing }}"), 
        { params: { timing: "0ms" }})
  ])
]

export function dvkLeaveTiming(timing: any) {
  return { value: null, params: { timing } };
}

export const testAnim = [
  style({ transform: "translateY(0)" }),
  animate("500ms", style({ transform: "translateY(-200%)" }))
]