import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { BarePostModel } from 'src/app/features/post/models/bare-post.model';
import { PostsService } from 'src/app/features/post/services/posts.service';
import { NodefeedModel } from '../../models/nodefeed.model';
import { NodefeedService } from '../../services/nodefeed.service';

/**
 * The nodefeed page container (similar to home-page)
 */
@Component({
  templateUrl: './node-feed-page.component.html',
  styleUrls: ['./node-feed-page.component.scss']
})
export class NodeFeedPageComponent {
  title!: string;
  nodefeed$!: Observable<NodefeedModel>;
  profilePicUrl$: Observable<string | null>;
  bareposts$: Observable<BarePostModel[]> = of([{} as BarePostModel]);

  constructor(private route: ActivatedRoute, private nodeFeedService: NodefeedService, private postsService: PostsService) {
    this.title = 'lol';
    this.nodefeed$ = this.route.paramMap.pipe(concatMap(params => this.nodeFeedService.getNodeFeed$(params.get('id') ?? '')));

    this.profilePicUrl$ = this.nodefeed$.pipe(
      switchMap(nf => this.nodeFeedService.getNodefeedPicture$(nf.name).pipe(catchError(() => of(null))))
    );
  }
}
