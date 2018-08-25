import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { DynamicComponentSerializerService } from './dynamic-component-serializer/dynamic-component-serializer.service';
import { DynamicComponentSerializerConstructorToken } from './dynamic-component-serializer/dynamic-component-serializer.token';
import { DefaultDynamicComponentSerializer } from './default-dynamic-component-serializer/default-dynamic-component-serializer';
import { DynamicComponentSerializerConstructor } from './dynamic-component-serializer/dynamic-component-serializer.constructor';

/**
 * The Dynamic Components Module exports the {@link DynamicComponentDirective}
 * that can be used to create dynamic components while alllowing them to
 * be wired up with input and output streams similar to components 
 * instantiated normally.
 * 
 * The forRoot method must be called in order to provide the directive 
 * with an implementation of the {@link DynamicComponentSerializer} which
 * handles the mapping of string names to actual Component class instances.
 * 
 * The default implementation {@link DefaultDynamicComponentSerializer} 
 * may be overriden with a custom implementation if desired.
 */
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

 