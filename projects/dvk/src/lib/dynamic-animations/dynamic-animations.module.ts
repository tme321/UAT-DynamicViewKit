import { NgModule, ModuleWithProviders } from '@angular/core';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { StateCssMapperService } from './state-css-mapper/state-css-mapper.service';
import { AnimationStatesService } from './animation-states/animation-states.service';
import { DynamicAnimationsHandlerConstructor } from './dynamic-animations-handler/dynamic-animations-handler.constructor';
import { DefaultDynamicAnimationsHandlerService } from './default-dynamic-animations-handler/default-dynamic-animations-handler.service';
import { DynamicAnimationsHandlerConstructorToken } from './dynamic-animations-handler/dynamic-animations-handler.token';

@NgModule({
  providers: [
    DynamicAnimationsService,
    AnimationStatesService, 
    StateCssMapperService
  ]
})
export class DynamicAnimationsModule {
  static forRoot(
    animationsHandlerConstructor: DynamicAnimationsHandlerConstructor = DefaultDynamicAnimationsHandlerService
  ): ModuleWithProviders {
    return {
      ngModule: DynamicAnimationsModule,
      providers: [
        { 
          provide: DynamicAnimationsHandlerConstructorToken, 
          useValue: animationsHandlerConstructor 
        }
      ]
    };
  }  
}
