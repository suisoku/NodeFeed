import { Component, Input } from '@angular/core';
import { BarePostModel } from '../models/bare-post.model';
import { PostsService } from '../services/posts.service';

/**
 * Abstract view of a nodefeed article
 */
@Component({
  selector: 'app-post-bare',
  template: ''
})
export class BarePostStubComponent {
  @Input() barePost!: BarePostModel;
  constructor(private postsService: PostsService) {}
}
