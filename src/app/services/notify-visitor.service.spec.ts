import { TestBed } from '@angular/core/testing';

import { NotifyVisitorService } from './notify-visitor.service';

describe('NotifyVisitorService', () => {
  let service: NotifyVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
