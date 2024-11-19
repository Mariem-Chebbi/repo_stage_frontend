import { TestBed } from '@angular/core/testing';

import { JiraAuthService } from './jira-auth.service';

describe('JiraAuthService', () => {
  let service: JiraAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JiraAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
