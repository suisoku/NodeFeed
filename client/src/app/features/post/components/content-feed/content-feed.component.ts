import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.scss']
})
export class ContentFeedComponent {
  constructor(private postsService: PostsService) {}
}
