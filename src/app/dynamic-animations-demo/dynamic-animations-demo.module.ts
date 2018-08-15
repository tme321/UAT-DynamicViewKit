import { NgModule } from '@angular/core';
import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo.component';
import { AlternatingPanelModule } from './alternating-panel/alternating-panel.module';

@NgModule({
  imports: [
    AlternatingPanelModule
  ],
  declarations: [DynamicAnimationsDemoComponent],
  exports: [DynamicAnimationsDemoComponent]
})
export class DynamicAnimationsDemoModule { }
