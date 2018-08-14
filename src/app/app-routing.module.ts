import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentConductorDemoComponent } from './content-conductor-demo/content-conductor-demo.component';
import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo/dynamic-animations-demo.component';
import { DynamicComponentsDemoComponent } from './dynamic-components-demo/dynamic-components-demo.component';

const routes: Routes = [
  { path: 'ContentConductor', component: ContentConductorDemoComponent },
  { path: 'DynamicAnimations', component: DynamicAnimationsDemoComponent },
  { path: 'DynamicComponents', component: DynamicComponentsDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
