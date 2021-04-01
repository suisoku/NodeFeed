import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BarePostModel } from '../models/bare-post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: BarePostModel[] = [];
  postsRef: AngularFirestoreCollection<BarePostModel>;

  constructor(private db: AngularFirestore) {
    this.postsRef = db.collection('posts');
  }

  public getBarePosts(): Observable<BarePostModel[]> {
    return this.postsRef
      .get()
      .pipe(map((querySnapshot: QuerySnapshot<BarePostModel>) => querySnapshot.docs.map((docSnapshot) => docSnapshot.data())));
  }

  public createBarePost(barePost: BarePostModel): void {
    void this.postsRef.add(barePost);
  }
}
