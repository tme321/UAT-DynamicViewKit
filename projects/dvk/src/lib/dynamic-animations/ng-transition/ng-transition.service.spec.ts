import { TestBed, inject } from '@angular/core/testing';

import { NgTransitionService } from './ng-transition.service';

describe('NgTransitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgTransitionService]
    });
  });

  it('should be created', inject([NgTransitionService], (service: NgTransitionService) => {
    expect(service).toBeTruthy();
  }));
});
