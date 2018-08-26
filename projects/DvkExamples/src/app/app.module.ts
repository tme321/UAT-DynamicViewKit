import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentConductorModule, DynamicAnimationsModule, DynamicComponentsModule } from '@uat/dvk';

import { ContentConductorExampleModule } from './content-conductor-example/content-conductor-example.module';
import { DynamicAnimationsExampleModule } from './dynamic-animations-example/dynamic-animations-example.module';
import { DynamicComponentsExampleModule } from './dynamic-components-example/dynamic-components-example.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    ContentConductorExampleModule,
    DynamicAnimationsExampleModule,
    DynamicComponentsExampleModule,

    ContentConductorModule.forRoot(),
    DynamicAnimationsModule.forRoot(),
    DynamicComponentsModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
