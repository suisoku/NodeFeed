import { Component, Input } from '@angular/core';
import { NodefeedModel } from '../models/nodefeed.model';

/**
 * The nodefeed page header containing title, bio and follow button
 */
@Component({
  selector: 'app-page-header',
  template: ''
})
export class PageHeaderStubComponent {
  @Input() nodefeed!: NodefeedModel | null;
}
