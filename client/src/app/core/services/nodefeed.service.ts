import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Nodefeed } from '../models/nodefeed.model';

@Injectable({
  providedIn: 'root'
})
export class NodefeedService {
  nodefeeds: Nodefeed[];
  nodefeedsRef: AngularFirestoreCollection<Nodefeed>;

  constructor(private db: AngularFirestore) {
    this.nodefeedsRef = db.collection('nodefeeds');
  }

  getNodeFeed(name: string): Observable<unknown> {
    return this.nodefeedsRef
      .doc(name)
      .get()
      .pipe(map((doc) => doc.data()));
  }

  createNodeFeed(nodefeedToCreate: Nodefeed): Promise<void> {
    return this.nodefeedsRef.doc(nodefeedToCreate.name).set(nodefeedToCreate);
  }
}
