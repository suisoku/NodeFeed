/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { NodefeedService } from './nodefeed.service';

describe('Service: Nodefeed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodefeedService]
    });
  });

  it('should ...', inject([NodefeedService], (service: NodefeedService) => {
    expect(service).toBeTruthy();
  }));
});