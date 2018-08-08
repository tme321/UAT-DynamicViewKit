import { TestBed, inject } from '@angular/core/testing';

import { AnimationStatesService } from './animation-states.service';

describe('AnimationStatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationStatesService]
    });
  });

  it('should be created', inject([AnimationStatesService], (service: AnimationStatesService) => {
    expect(service).toBeTruthy();
  }));
});
