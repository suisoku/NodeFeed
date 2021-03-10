import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nodefeed } from './core/models/nodefeed.model';
import { NodefeedService } from './core/services/nodefeed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  items: Observable<unknown[]>;

  nodefeed$ = this.nodeFeedService.getNodeFeed('@instagram');

  constructor(private nodeFeedService: NodefeedService) {}

  ngOnInit(): void {
    this.nodeFeedService
      .createNodeFeed({
        name: '@instagram',
        title: 'Instagram',
        description:
          'New age platform allowing young creators to share their feed',
        followersCounter: 62734,
        postsCounter: 34167,
      })
      .then(() => console.log('Nodefeed successfully created'))
      .catch((error) => console.log('error creating NodeFeed : ', error));
  }

  getNodeFeed(name: string): string {
    return name;
  }

  filler(): Nodefeed {
    return {
      name: '@instagram',
      title: 'Instagram',
      description:
        'New age platform allowing young creators to share their feed',
      followersCounter: 652734,
      postsCounter: 14167,
    } as Nodefeed;
  }
}
