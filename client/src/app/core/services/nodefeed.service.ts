import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodefeedModel } from '../models/nodefeed.model';

/**
 * Service managing nodefeed posts uses {@link AngularFireStore}
 */
@Injectable({
  providedIn: 'root'
})
export class NodefeedService {
  nodefeeds: NodefeedModel[] = [];
  nodefeedsRef: AngularFirestoreCollection<NodefeedModel>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private http: HttpClient) {
    this.nodefeedsRef = db.collection('nodefeeds');
  }

  getNodeFeed$(name: string): Observable<NodefeedModel> {
    return this.nodefeedsRef
      .doc(name)
      .get()
      .pipe(map(doc => doc.data() as NodefeedModel));
  }

  createNodeFeed(nodefeedToCreate: NodefeedModel): Promise<void> {
    return this.nodefeedsRef.doc(nodefeedToCreate.name).set(nodefeedToCreate);
  }

  storeNodefeedPicture(nodefeedName: string, picture: Blob): AngularFireUploadTask {
    const ref = this.storage.ref(`nodefeed_pictures/${nodefeedName}.png`);
    return ref.put(picture);
  }

  getNodefeedPicture$(nodefeedName: string): Observable<string> {
    const ref = this.storage.ref(`nodefeed_pictures/${nodefeedName}.png`);
    return ref.getDownloadURL() as Observable<string>;
  }
}
