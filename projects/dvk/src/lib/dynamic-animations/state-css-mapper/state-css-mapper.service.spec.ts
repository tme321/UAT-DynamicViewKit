import { TestBed, inject } from '@angular/core/testing';

import { StateCssMapperService } from './state-css-mapper.service';

describe('StateCssMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateCssMapperService]
    });
  });

  it('should be created', inject([StateCssMapperService], (service: StateCssMapperService) => {
    expect(service).toBeTruthy();
  }));
});
