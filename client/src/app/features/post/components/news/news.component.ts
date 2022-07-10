import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * News
 */
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {}
