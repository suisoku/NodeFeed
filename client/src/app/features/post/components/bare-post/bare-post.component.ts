import { Component, Input } from '@angular/core';
import { BarePostModel } from '../../models/bare-post.model';
import { PostsService } from '../../services/posts.service';

/**
 * Abstract view of a nodefeed article
 */
@Component({
  selector: 'app-post-bare',
  templateUrl: './bare-post.component.html',
  styleUrls: ['./bare-post.component.scss']
})
export class BarePostComponent {
  @Input() barePost!: BarePostModel;
  constructor(private postsService: PostsService) {}
}
// IdeaPost
// FeaturePost
// BugPost
// BarePost
