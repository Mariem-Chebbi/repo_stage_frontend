import { TestBed } from '@angular/core/testing';

import { DocumentationServiceService } from './documentation-service.service';

describe('DocumentationServiceService', () => {
  let service: DocumentationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
