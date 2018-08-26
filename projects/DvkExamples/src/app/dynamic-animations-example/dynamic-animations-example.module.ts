import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicAnimationsExampleComponent } from './dynamic-animations-example.component';
import { DynamicAnimationsModule } from '@uat/dvk';

@NgModule({
  imports: [
    CommonModule,
    DynamicAnimationsModule
  ],
  declarations: [DynamicAnimationsExampleComponent]
})
export class DynamicAnimationsExampleModule { }
