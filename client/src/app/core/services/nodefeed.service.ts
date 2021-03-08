import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Nodefeed } from '../models/nodefeed.model';
import { Post } from '../models/post.model';
import { map, catchError } from 'rxjs/operators';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class NodefeedService {

  nodefeeds: Nodefeed[];
  nodefeedsRef: AngularFirestoreCollection<Nodefeed>;

  constructor(private db: AngularFirestore) {
    this.nodefeedsRef = db.collection('nodefeeds');
  }

  getNodeFeed(name: string): Observable<{}> {
    return this.nodefeedsRef.doc(name).get().pipe(map((doc) => doc.data()));
  }

  createNodeFeed(nodefeedToCreate: Nodefeed): Promise<void> {
    return this.nodefeedsRef.doc(nodefeedToCreate.name).set(nodefeedToCreate);
  }

}
