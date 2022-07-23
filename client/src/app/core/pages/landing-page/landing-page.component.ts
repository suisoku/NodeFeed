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
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

}
