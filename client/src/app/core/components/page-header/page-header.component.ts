import { Component, Input } from '@angular/core';
import { NodefeedModel } from '../../models/nodefeed.model';

/**
 * The nodefeed page header containing title, bio and follow button
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() nodefeed!: NodefeedModel | null;
  @Input() profilePicture!: string | null;

  getNameInitial(): string {
    return this.nodefeed?.name.charAt(0) || 'A';
  }
}
