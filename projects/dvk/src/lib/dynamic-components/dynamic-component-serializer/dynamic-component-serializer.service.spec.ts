import { TestBed, inject } from '@angular/core/testing';

import { DynamicComponentSerializerService } from './dynamic-component-serializer.service';

describe('DynamicComponentSerializerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicComponentSerializerService]
    });
  });

  it('should be created', inject([DynamicComponentSerializerService], (service: DynamicComponentSerializerService) => {
    expect(service).toBeTruthy();
  }));
});
