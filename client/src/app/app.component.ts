import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Nodefeed } from './core/models/nodefeed.model';
import { NodefeedService } from './core/services/nodefeed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  items: Observable<any[]>;

  nodefeed$ = this.NodeFeedService.getNodeFeed('@instagram');

  constructor(private NodeFeedService: NodefeedService) {
    
  }

  ngOnInit(): void {
    this.NodeFeedService.createNodeFeed({
      name: '@instagram',
      title: 'Instagram',
      description: 'New age platform allowing young creators to share their feed',
      followersCounter: 62734,
      postsCounter: 34167
    })
      .then(() => console.log('Nodefeed successfully created'))
      .catch((error) => console.log('error creating NodeFeed : ', error));
  }

  getNodeFeed(name: string) {
    return null;
  }

  filler() {
    return {
      name: '@instagram',
      title: 'Instagram',
      description: 'New age platform allowing young creators to share their feed',
      followersCounter: 652734,
      postsCounter: 14167
    } as Nodefeed;
  }
}
