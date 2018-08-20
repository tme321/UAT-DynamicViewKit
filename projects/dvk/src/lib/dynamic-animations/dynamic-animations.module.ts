import { NgModule, ModuleWithProviders } from '@angular/core';
import { DynamicAnimationsService } from './dynamic-animations.service';
import { StateCssMapperService } from './state-css-mapper/state-css-mapper.service';
import { AnimationStatesService } from './animation-states/animation-states.service';
import { DynamicAnimationsHandlerConstructor } from './dynamic-animations-handler/dynamic-animations-handler.constructor';
import { DefaultDynamicAnimationsHandlerService } from './default-dynamic-animations-handler/default-dynamic-animations-handler.service';
import { DynamicAnimationsHandlerConstructorToken } from './dynamic-animations-handler/dynamic-animations-handler.token';
import { AnimationStateMachineConstructorToken } from './animation-state-machine/animation-state-machine.token';
import { DefaultAnimationsStateMachine } from './default-animations-state-machine/default-animations-state-machine.service';
import { AnimationStateMachineConstructor } from './animation-state-machine/animation-state-machine.constructor';
import { DynamicAnimationsDirective } from './dynamic-animations.directive';
import { NgTransitionService } from './ng-transition/ng-transition.service';
import { LeaveDirective } from './leave/leave.directive';

@NgModule({
  providers: [
    DynamicAnimationsService,
    AnimationStatesService, 
    StateCssMapperService,
    NgTransitionService
  ],
  declarations: [DynamicAnimationsDirective, LeaveDirective],
  exports: [DynamicAnimationsDirective, LeaveDirective]
})
export class DynamicAnimationsModule {
  static forRoot(
    animationsHandlerConstructor: DynamicAnimationsHandlerConstructor = DefaultDynamicAnimationsHandlerService,
    animationsStateMachineConstructor: AnimationStateMachineConstructor = DefaultAnimationsStateMachine 
  ): ModuleWithProviders {
    return {
      ngModule: DynamicAnimationsModule,
      providers: [
        { 
          provide: DynamicAnimationsHandlerConstructorToken, 
          useValue: animationsHandlerConstructor 
        },
        {
          provide: AnimationStateMachineConstructorToken,
          useValue: animationsStateMachineConstructor
        }
      ]
    };
  }  
}
