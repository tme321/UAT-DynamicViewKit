import { Directive, TemplateRef, Input, AfterViewInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Content } from './content.model';

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
export class ContentDirective implements Content {
  @Input('dvk-content') initialContainerName: string;

  get template() { return this.templateRef; }

  constructor(private templateRef: TemplateRef<any>) {
    
  }
}
