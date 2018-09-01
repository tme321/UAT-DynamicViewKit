import { Directive, TemplateRef } from '@angular/core';
import { ContentDirective } from '@uat/dvk';

@Directive({
  selector: '[two-content]'
})
export class TwoContentDirective extends ContentDirective {
  readonly initialContainerName = 'two';

  constructor(private tRef: TemplateRef<any>) { super(tRef); }
}
