import { Directive, TemplateRef } from '@angular/core';

/**
 * A directive that must be used as a structural 
 * directive so that the TemplateRef is injected.
 * 
 * @example
 * <span *dvk-content>Some Content To Display In A Container</span>
 */
@Directive({
  selector: '[dvk-content]'
})
export class ContentDirective {
  constructor(private templateRef: TemplateRef<any>) {}
}
