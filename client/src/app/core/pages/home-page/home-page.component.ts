import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { BarePostModel } from 'src/app/features/post/models/bare-post.model';
import { PostsService } from 'src/app/features/post/services/posts.service';
import { NodefeedModel } from '../../models/nodefeed.model';
import { NodefeedService } from '../../services/nodefeed.service';

/**
 * Continuous feed and home page
 */
@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title!: string;
  nodefeed$: Observable<NodefeedModel> = this.nodeFeedService.getNodeFeed$('@instagram');
  bareposts$: Observable<BarePostModel[]> = this.postsService.getBarePosts$();

  constructor(
    private nodeFeedService: NodefeedService,
    private postsService: PostsService,
    private renderer: Renderer2
  ) {
    this.renderer.removeClass(document.querySelector('html'), 'sign-layout-background');
  }

  ngOnInit(): void {
    void this.nodeFeedService.createNodeFeed({
      name: '@instagram',
      title: 'Instagram',
      description: 'New age platform allowing young creators to share their feed',
      officialLink: '',
      tags: '',
      followersCounter: 62734,
      postsCounter: 34167
    });

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
      officialLink: '',
      tags: '',
      followersCounter: 652734,
      postsCounter: 14167
    };
  }
}
