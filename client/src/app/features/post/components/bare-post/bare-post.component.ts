import { Component, Input } from '@angular/core';
import { BarePostModel } from '../../models/bare-post.model';

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
}
// IdeaPost
// FeaturePost
// BugPost
// BarePost
