import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentConductorExampleComponent } from './content-conductor-example.component';
import { ContainersComponent } from './containers/containers.component';
import { ContentConductorModule } from '@uat/dvk';

@NgModule({
  imports: [
    CommonModule,
    ContentConductorModule
  ],
  declarations: [ContentConductorExampleComponent, ContainersComponent]
})
export class ContentConductorExampleModule { }
