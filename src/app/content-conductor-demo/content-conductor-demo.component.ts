import { Component } from '@angular/core';

/**
 * Used just for tesitng the content conductor functionality.
 */
@Component({
  selector: '[content-conductor-demo]',
  templateUrl: './content-conductor-demo.component.html',
  styleUrls: ['./content-conductor-demo.component.css']
})
export class ContentConductorDemoComponent {
  dynamicContents = [];
  dContainerName = 'one';
  oneContents = [];
  twoContents = [];

  onClick() {
    this.dynamicContents.push(0);
    this.dContainerName = this.dContainerName === 'one'? 'two':'one';
  }

  onClickOne() {
    this.oneContents.push(0);
  }

  onClickTwo() {
    this.twoContents.push(0);
  }

}
