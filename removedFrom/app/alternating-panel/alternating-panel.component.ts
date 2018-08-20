import { Component, ElementRef } from '@angular/core';
import { DynamicAnimationsBase, DynamicAnimationsService } from '@uat/dvk';

/**
 * Example component that extends DynamicAnimationsBase
 */
@Component({
  selector: '[alt-panel]',
  templateUrl: './alternating-panel.component.html',
  styleUrls: ['./alternating-panel.component.css'],
})
export class AlternatingPanelComponent extends DynamicAnimationsBase {
  constructor(
    protected elRef: ElementRef,
    protected daServ: DynamicAnimationsService,
  ) {
    super(elRef.nativeElement, daServ);
  }
}
