import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentConductorDemoComponent } from './content-conductor-demo.component';
import { ContentConductorModule } from '@uat/dvk';

@NgModule({
  imports: [
    CommonModule,
    ContentConductorModule
  ],
  declarations: [
    ContentConductorDemoComponent
  ],
  exports: [
    ContentConductorDemoComponent
  ]
})
export class ContentConductorDemoModule { }
