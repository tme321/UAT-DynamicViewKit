import { DefaultContentConductorService } from './default-content-conductor/default-content-conductor.service';
import { ContentConductorConstructorToken } from './content-conductor-constructor/content-conductor-constructor.token';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentConductorService } from './content-conductor.service';
import { ContentDirective } from './content/content.directive';
import { ContentContainerDirective } from './content-container/content-container.directive';
import { ContentConductorConstructor } from './content-conductor-constructor/content-conductor-constructor.model';

@NgModule({
  declarations: [
    ContentDirective, 
    ContentContainerDirective 
  ],
  exports: [
    ContentDirective, 
    ContentContainerDirective
  ],
  providers: [
    ContentConductorService
  ]
})
export class ContentConductorModule {
  static forRoot(conductorConstructor: ContentConductorConstructor = DefaultContentConductorService): ModuleWithProviders {
    return {
      ngModule: ContentConductorModule,
      providers: [
        { 
          provide: ContentConductorConstructorToken, 
          useValue: conductorConstructor  
        }
      ]
    };
  }
}
