import { TestBed, inject } from '@angular/core/testing';

import { ContentConductorService } from './content-conductor.service';

describe('ContentConductorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentConductorService]
    });
  });

  it('should be created', inject([ContentConductorService], (service: ContentConductorService) => {
    expect(service).toBeTruthy();
  }));
});
