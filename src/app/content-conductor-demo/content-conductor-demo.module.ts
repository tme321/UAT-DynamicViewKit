import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentConductorDemoComponent } from './content-conductor-demo.component';
import { ContentConductorModule } from '@uat/dvk';
import { ContainersComponent } from './containers/containers.component';
import { OneContentDirective } from './one-content/one-content.directive';
import { TwoContentDirective } from './two-content/two-content.directive';

@NgModule({
  imports: [
    CommonModule,
    ContentConductorModule
  ],
  declarations: [
    ContentConductorDemoComponent,
    ContainersComponent,
    OneContentDirective,
    TwoContentDirective
  ],
  exports: [
    ContentConductorDemoComponent
  ]
})
export class ContentConductorDemoModule { }
