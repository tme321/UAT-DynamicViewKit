import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentConductorDemoModule } from './content-conductor-demo/content-conductor-demo.module';
import { NavBarModule } from './shared/nav-bar/nav-bar.module';

import { ContentConductorModule, DynamicAnimationsModule, DynamicComponentsModule } from '@uat/dvk';
import { DynamicAnimationsDemoModule } from './dynamic-animations-demo/dynamic-animations-demo.module';
import { DynamicComponentsDemoModule } from './dynamic-components-demo/dynamic-components-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavBarModule,
    ContentConductorDemoModule,
    DynamicAnimationsDemoModule,
    DynamicComponentsDemoModule,


    ContentConductorModule.forRoot(),
    DynamicAnimationsModule.forRoot(),
    DynamicComponentsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
