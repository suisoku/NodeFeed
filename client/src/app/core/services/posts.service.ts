import { DebugNode, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: Post[];
  postsRef: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.postsRef = db.collection('posts');
  }

  public getCollection() {
    this.postsRef.get().subscribe({
      next: (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
      },
      error: () => console.log('error fetching data')
    });
  }
}
