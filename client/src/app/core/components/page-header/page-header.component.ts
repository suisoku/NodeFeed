import { Component, Input } from '@angular/core';
import { NodefeedModel } from '../../models/nodefeed.model';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() nodefeed!: NodefeedModel | null;
}
