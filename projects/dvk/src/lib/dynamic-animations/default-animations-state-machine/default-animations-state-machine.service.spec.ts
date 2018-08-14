import { TestBed, inject } from '@angular/core/testing';

import { DefaultAnimationsStateMachine } from './default-animations-state-machine.service';

describe('DefaultAnimationsStateMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultAnimationsStateMachine]
    });
  });

  it('should be created', inject([DefaultAnimationsStateMachine], (service: DefaultAnimationsStateMachine) => {
    expect(service).toBeTruthy();
  }));
});
