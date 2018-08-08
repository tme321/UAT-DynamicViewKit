import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo.component';
import { AlternatingPanelModule } from './alternating-panel/alternating-panel.module';

@NgModule({
  imports: [
    //CommonModule,
    AlternatingPanelModule
  ],
  declarations: [DynamicAnimationsDemoComponent],
  exports: [DynamicAnimationsDemoComponent]
})
export class DynamicAnimationsDemoModule { }
