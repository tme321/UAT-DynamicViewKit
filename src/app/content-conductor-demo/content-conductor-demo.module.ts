import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentConductorDemoComponent } from './content-conductor-demo.component';
import { ContentConductorModule } from '@uat/dvk';
import { ContainersComponent } from './containers/containers.component';

@NgModule({
  imports: [
    CommonModule,
    ContentConductorModule
  ],
  declarations: [
    ContentConductorDemoComponent,
    ContainersComponent
  ],
  exports: [
    ContentConductorDemoComponent
  ]
})
export class ContentConductorDemoModule { }
