import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NodefeedModel } from './core/models/nodefeed.model';
import { NodefeedService } from './core/services/nodefeed.service';
import { BarePostModel } from './features/post/models/bare-post.model';
import { PostsService } from './features/post/services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title!: string;
  nodefeed$: Observable<NodefeedModel> = this.nodeFeedService.getNodeFeed('@instagram');
  bareposts$: Observable<BarePostModel[]> = this.postsService.getBarePosts();

  constructor(private nodeFeedService: NodefeedService, private postsService: PostsService) {}

  ngOnInit(): void {
    this.nodeFeedService
      .createNodeFeed({
        name: '@instagram',
        title: 'Instagram',
        description: 'New age platform allowing young creators to share their feed',
        followersCounter: 62734,
        postsCounter: 34167
      })
      .then(() => console.log('Nodefeed successfully created'))
      .catch((error) => console.log('error creating NodeFeed : ', error));

    this.postsService.createBarePost({
      author: 'Noureddine Ziani',
      content: 'aaaaaaaa',
      date: new Date(),
      nodefeed: 'Samsung Health',
      title: 'Adding a webb interface to Samsung Health',
      likeCounter: 234,
      commentCounter: 111
    });
  }

  getNodeFeed(name: string): string {
    return name;
  }

  filler(): NodefeedModel {
    return {
      name: '@instagram',
      title: 'Instagram',
      description: 'New age platform allowing young creators to share their feed',
      followersCounter: 652734,
      postsCounter: 14167
    };
  }
}
