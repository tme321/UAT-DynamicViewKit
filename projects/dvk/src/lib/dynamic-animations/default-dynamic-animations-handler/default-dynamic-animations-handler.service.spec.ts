import { TestBed, inject } from '@angular/core/testing';

import { DefaultDynamicAnimationsHandlerService } from './default-dynamic-animations-handler.service';

describe('DefaultDynamicAnimationsHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultDynamicAnimationsHandlerService]
    });
  });

  it('should be created', inject([DefaultDynamicAnimationsHandlerService], (service: DefaultDynamicAnimationsHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
