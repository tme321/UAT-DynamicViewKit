import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo.component';
//import { AlternatingPanelModule } from './alternating-panel/alternating-panel.module';
import { DynamicAnimationsModule } from '@uat/dvk';
import { StaticAnimationsTestComponent } from './static-animations-test/static-animations-test.component';

@NgModule({
  imports: [
    CommonModule,
    //AlternatingPanelModule,
    DynamicAnimationsModule
  ],
  declarations: [
    DynamicAnimationsDemoComponent, 
    StaticAnimationsTestComponent],
  exports: [DynamicAnimationsDemoComponent]
})
export class DynamicAnimationsDemoModule { }
