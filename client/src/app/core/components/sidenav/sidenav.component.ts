import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from 'src/app/features/post/components/create-post/create-post.component';

/**
 * Side menu in home feed
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() pageName?: string;

  constructor(public dialog: MatDialog) {}

  public openCreationPostDialog(): void {
    this.dialog.open(CreatePostComponent, {
      width: '600px',
      enterAnimationDuration: '300ms',
      disableClose: true,
      data: this.pageName
    });
  }
}
