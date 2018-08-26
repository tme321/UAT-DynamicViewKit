import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentsExampleComponent } from './dynamic-components-example.component';
import { TextComponent } from './text/text.component';
import { NumberComponent } from './number/number.component';
import { DynamicComponentsModule } from '@uat/dvk';

@NgModule({
  imports: [
    CommonModule,
    DynamicComponentsModule
  ],
  declarations: [DynamicComponentsExampleComponent, TextComponent, NumberComponent],
  entryComponents: [TextComponent, NumberComponent]
})
export class DynamicComponentsExampleModule { }
