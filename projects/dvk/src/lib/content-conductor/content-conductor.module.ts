import { DefaultContentConductorService } from './default-content-conductor/default-content-conductor.service';
import { ContentConductorConstructorToken } from './content-conductor-constructor/content-conductor-constructor.token';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ContentConductorService } from './content-conductor.service';
import { ContentDirective } from './content/content.directive';
import { ContentContainerDirective } from './content-container/content-container.directive';
import { ContentConductorConstructor } from './content-conductor-constructor/content-conductor-constructor.model';

/**
 * The Content Conductor Module contains the parts necessary to define 
 * containers within a component's view, allow users to provide content
 * for those containers, and move the content between those containers 
 * based on string names assigned to each container.
 * 
 * This functionality is handled through Angular's own abstractions 
 * instead of manually twiddling DOM elements.
 * 
 * The forRoot function instantiates the module with a token 
 * for the {@link ContentConductorService} to actually create the 
 * {@link ContentConductor} that provides the functionality and must 
 * be called for the provided functionality.  The optional parameter 
 * is the class that actually provides the functionality for moving
 * content.  By default the {@link DefaultContentConductorService} is
 * used but a custom version can be supplied that conforms to the
 * {@link ContentConductor} interface.
 */
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
