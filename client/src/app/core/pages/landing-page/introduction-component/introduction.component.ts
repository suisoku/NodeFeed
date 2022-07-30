import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { BarePostModel } from 'src/app/features/post/models/bare-post.model';
import { PostsService } from 'src/app/features/post/services/posts.service';
import { NodefeedModel } from '../../../models/nodefeed.model';
import { NodefeedService } from '../../../services/nodefeed.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {

}
