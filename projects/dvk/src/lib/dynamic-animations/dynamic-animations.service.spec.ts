import { TestBed, inject } from '@angular/core/testing';

import { DynamicAnimationsService } from './dynamic-animations.service';

describe('DynamicAnimationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicAnimationsService]
    });
  });

  it('should be created', inject([DynamicAnimationsService], (service: DynamicAnimationsService) => {
    expect(service).toBeTruthy();
  }));
});
