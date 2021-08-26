import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { NodefeedModel } from '../models/nodefeed.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';

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
      .pipe(map((doc) => doc.data() as NodefeedModel));
  }

  createNodeFeed(nodefeedToCreate: NodefeedModel): Promise<void> {
    return this.nodefeedsRef.doc(nodefeedToCreate.name).set(nodefeedToCreate);
  }

  storeNodefeedPicture(nodefeedName: string, picture: string): AngularFireUploadTask {
    const ref = this.storage.ref(`nodefeed_pictures/${nodefeedName}`);
    return ref.putString(picture);
  }

  getNodefeedPicture$(nodefeedName: string): Observable<string> {
    const ref = this.storage.ref(`nodefeed_pictures/${nodefeedName}`);
    const headers = {};
    return ref
      .getDownloadURL()
      .pipe(
        switchMap((url: string) =>
          this.http.get(url, { headers, responseType: 'text' }).pipe(tap((res) => console.log('asdasd', res)))
        )
      );
  }
}
