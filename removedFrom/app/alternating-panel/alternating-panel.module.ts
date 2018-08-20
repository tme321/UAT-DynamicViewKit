import { NgModule } from '@angular/core';
import { AlternatingPanelComponent } from './alternating-panel.component';
import { AlternatingPanelDirective } from './alternating-panel.directive';

@NgModule({
  declarations: [
    AlternatingPanelComponent,
    AlternatingPanelDirective, 
  ],

  exports: [
    AlternatingPanelComponent,
    AlternatingPanelDirective
  ]
})
export class AlternatingPanelModule { 
}
