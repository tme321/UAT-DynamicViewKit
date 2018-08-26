import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentConductorExampleComponent } from './content-conductor-example/content-conductor-example.component';
import { DynamicAnimationsExampleComponent } from './dynamic-animations-example/dynamic-animations-example.component';
import { DynamicComponentsExampleComponent } from './dynamic-components-example/dynamic-components-example.component';

const routes: Routes = [
  { path: 'ContentConductor', component: ContentConductorExampleComponent },
  { path: 'DynamicAnimations', component: DynamicAnimationsExampleComponent },
  { path: 'DynamicComponents', component: DynamicComponentsExampleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
