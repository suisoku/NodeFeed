import { TestBed, inject } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { NodefeedService } from './nodefeed.service';

describe('NodefeedService', () => {
  let service: NodefeedService;
  let angularFireStore: AngularFirestore; //instance mock

  beforeEach(() => {
    const angularFireStoreProvider = jasmine.createSpyObj('AngularFireStore', ['collection']);
    TestBed.configureTestingModule({
      providers: [NodefeedService, { provide: AngularFirestore, useValue: angularFireStoreProvider }]
    });

    angularFireStore = TestBed.inject(AngularFirestore);
    service = TestBed.inject(NodefeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
