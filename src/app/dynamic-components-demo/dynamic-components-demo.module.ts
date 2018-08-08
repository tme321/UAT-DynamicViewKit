import { NgModule } from '@angular/core';
import { DynamicComponentsDemoComponent } from './dynamic-components-demo.component';
import { DynamicComponentsModule } from '@uat/dvk';
import { TextComponent } from './text-component/text-component.component';

@NgModule({
  imports: [
    DynamicComponentsModule
  ],
  declarations: [
    DynamicComponentsDemoComponent, 
    TextComponent],
  exports: [DynamicComponentsDemoComponent],
  entryComponents: [TextComponent]
})
export class DynamicComponentsDemoModule { }
