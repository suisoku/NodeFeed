/* eslint-disable @typescript-eslint/no-unused-vars */

import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PostsService } from './posts.service';

describe('Service: Posts', () => {
  let serviceMock: PostsService;
  let angularFireStoreInstanceMock: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    //mock and provide AngularFirestore
    const angularFireStoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);

    TestBed.configureTestingModule({
      providers: [PostsService, { provide: AngularFirestore, useValue: angularFireStoreMock }]
    });

    angularFireStoreInstanceMock = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    serviceMock = TestBed.inject(PostsService);
  });

  it('should be truthy', () => {
    expect(serviceMock).toBeTruthy();
  });
});
