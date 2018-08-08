import { Directive, ViewContainerRef, Input } from '@angular/core';
import { ContentConductorService } from '../content-conductor.service';
import { ContentContainer } from './content-container.model';

/**
 * A directive that can be attached to create a container 
 * where content with an attached {@link ContentDirective}
 * can be displayed.
 * 
 * The string set to the directive name is used to refer to
 * this container by the {@link ContentConductor}.
 * 
 * @example
 * <div dvk-content-container="my-container"></div>
 */
@Directive({
  selector: '[dvk-content-container]'
})
export class ContentContainerDirective implements ContentContainer {
  @Input('dvk-content-container') containerName: string;

  get viewContainer() { return this.vcRef; }

  constructor(
    private vcRef: ViewContainerRef,
    private ccService: ContentConductorService) {}
}



