import { TestBed, inject } from '@angular/core/testing';

import { APIIntegrationService } from './APIIntegration.service';

describe('APIIntegrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIIntegrationService]
    });
  });

  it('should be created', inject([APIIntegrationService], (service: APIIntegrationService) => {
    expect(service).toBeTruthy();
  }));
});
