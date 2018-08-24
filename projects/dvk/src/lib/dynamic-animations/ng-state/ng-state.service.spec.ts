import { TestBed, inject } from '@angular/core/testing';

import { NgStateService } from './ng-state.service';

describe('NgStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgStateService]
    });
  });

  it('should be created', inject([NgStateService], (service: NgStateService) => {
    expect(service).toBeTruthy();
  }));
});
