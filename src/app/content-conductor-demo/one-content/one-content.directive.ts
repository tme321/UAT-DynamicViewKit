import { Directive, TemplateRef } from '@angular/core';
import { ContentDirective } from '@uat/dvk';

@Directive({
  selector: '[one-content]'
})
export class OneContentDirective extends ContentDirective {
  readonly initialContainerName = 'one';

  constructor(private tRef: TemplateRef<any>) { super(tRef) }
}
