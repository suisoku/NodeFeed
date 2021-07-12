import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodefeedModel } from '../models/nodefeed.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

/**
 * Service managing nodefeed posts uses {@link AngularFireStore}
 */
@Injectable({
  providedIn: 'root'
})
export class NodefeedService {
  nodefeeds: NodefeedModel[] = [];
  nodefeedsRef: AngularFirestoreCollection<NodefeedModel>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
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

  storeNodefeedPicture(nodefeedName: string, picture: string): AngularFireUploadTask {
    const ref = this.storage.ref(`nodefeed_pictures/${nodefeedName}`);
    return ref.putString(picture);
  }
}
