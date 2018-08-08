import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { DynamicComponentSerializerService } from './dynamic-component-serializer/dynamic-component-serializer.service';
import { DynamicComponentSerializerConstructorToken } from './dynamic-component-serializer/dynamic-component-serializer.token';
import { DefaultDynamicComponentSerializer } from './default-dynamic-component-serializer/default-dynamic-component-serializer';
import { DynamicComponentSerializerConstructor } from './dynamic-component-serializer/dynamic-component-serializer.constructor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynamicComponentDirective 
  ],
  exports: [
    DynamicComponentDirective 
  ],
  providers: [
    DynamicComponentSerializerService
  ]
})
export class DynamicComponentsModule {
  static forRoot(
    serializerConstrutor: DynamicComponentSerializerConstructor = DefaultDynamicComponentSerializer
  ): ModuleWithProviders {
    return {
      ngModule: DynamicComponentsModule,
      providers: [
        { 
          provide: DynamicComponentSerializerConstructorToken,
          useValue: serializerConstrutor
        }
      ]
    };
  }  
 }

 