import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-bare',
  templateUrl: './bare-post.component.html',
  styleUrls: ['./bare-post.component.scss']
})
export class BarePostComponent {
  constructor(private postsService: PostsService) {}
}
// IdeaPost
// FeaturePost
// BugPost
// BarePost
