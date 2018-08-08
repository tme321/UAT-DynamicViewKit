import { TestBed, inject } from '@angular/core/testing';

import { DefaultContentConductorService } from './default-content-conductor.service';

describe('DefaultContentConductorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultContentConductorService]
    });
  });

  it('should be created', inject([DefaultContentConductorService], (service: DefaultContentConductorService<any>) => {
    expect(service).toBeTruthy();
  }));
});
