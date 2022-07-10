import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreationPostState } from '../../enums/creation-post-state';
/**
 * Creation of Post
 */
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePostComponent {
  creationPostState = CreationPostState;
  currentCreationPostState: CreationPostState;
  isPostTypeSelected: boolean;
  typePostLabel: string;

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>) {
    this.currentCreationPostState = CreationPostState.CHOOSE_POST_TYPE;
    this.isPostTypeSelected = false;
    this.typePostLabel = '';
  }

  public choosePostType(value: CreationPostState): void {
    this.currentCreationPostState = value;
    this.isPostTypeSelected = true;
    this.typePostLabel =
      value === CreationPostState.BUG_POST ? 'Bug' : value === CreationPostState.NEWS_POST ? 'News' : 'Bug';
  }
  /**
   * Next button
   */
  public next(): void {
    this.dialogRef.close();
  }
}
