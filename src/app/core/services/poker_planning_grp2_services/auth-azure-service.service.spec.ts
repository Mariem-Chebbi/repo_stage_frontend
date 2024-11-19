import { TestBed } from '@angular/core/testing';

import { AuthAzureServiceService } from './auth-azure-service.service';

describe('AuthAzureServiceService', () => {
  let service: AuthAzureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthAzureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
