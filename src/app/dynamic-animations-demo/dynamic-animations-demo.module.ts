import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo.component';
import { AlternatingPanelModule } from './alternating-panel/alternating-panel.module';
import { DynamicAnimationsModule } from '@uat/dvk';

@NgModule({
  imports: [
    CommonModule,
    AlternatingPanelModule,
    DynamicAnimationsModule
  ],
  declarations: [DynamicAnimationsDemoComponent],
  exports: [DynamicAnimationsDemoComponent]
})
export class DynamicAnimationsDemoModule { }
