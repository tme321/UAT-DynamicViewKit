import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentConductorDemoModule } from './content-conductor-demo/content-conductor-demo.module';

import { ContentConductorModule, DynamicAnimationsModule } from '@uat/dvk';
import { DynamicAnimationsDemoModule } from './dynamic-animations-demo/dynamic-animations-demo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ContentConductorDemoModule,
    DynamicAnimationsDemoModule,


    ContentConductorModule.forRoot(),
    DynamicAnimationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
