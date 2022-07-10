import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Bug
 */
@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BugComponent {
  // constructor() { }
}
