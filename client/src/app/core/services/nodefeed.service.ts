import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodefeedModel } from '../models/nodefeed.model';

@Injectable({
  providedIn: 'root'
})
export class NodefeedService {
  nodefeeds: NodefeedModel[] = [];
  nodefeedsRef: AngularFirestoreCollection<NodefeedModel>;

  constructor(private db: AngularFirestore) {
    this.nodefeedsRef = db.collection('nodefeeds');
  }

  getNodeFeed$(name: string): Observable<NodefeedModel> {
    return this.nodefeedsRef
      .doc(name)
      .get()
      .pipe(map((doc) => doc.data() as NodefeedModel));
  }

  createNodeFeed(nodefeedToCreate: NodefeedModel): Promise<void> {
    return this.nodefeedsRef.doc(nodefeedToCreate.name).set(nodefeedToCreate);
  }
}
