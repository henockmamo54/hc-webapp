import { TestBed } from '@angular/core/testing';

import { ManageApiCallService } from './manage-api-call.service';

describe('ManageApiCallService', () => {
  let service: ManageApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
