import { Directive, TemplateRef } from '@angular/core';

/**
 * A directive that must be used as a structural 
 * directive so that the {@link TemplateRef} is correctly 
 * injected.
 * 
 * It can be attached to any element.
 * 
 * @example
 * <span *bb-content>Some Content To Display In A Container</span>
 */
@Directive({
  selector: '[dvk-content]'
})
export class ContentDirective {
  constructor(private templateRef: TemplateRef<any>) {
  }
}
