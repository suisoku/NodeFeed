import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
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
  postFrom: FormGroup;

  creationPostState = CreationPostState;
  currentCreationPostState: CreationPostState;
  isPostTypeSelected: boolean;
  typePostLabel: string;

  imageSelected: Event | null = null;
  croppingApplied = false;
  croppedImage?: string | null = null;

  constructor(private dialogRef: MatDialogRef<CreatePostComponent>) {
    this.currentCreationPostState = CreationPostState.CHOOSE_POST_TYPE;
    this.isPostTypeSelected = false;
    this.typePostLabel = '';
    this.postFrom = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      picture: new FormControl(this.croppedImage)
    });
  }

  public choosePostType(value: CreationPostState): void {
    this.currentCreationPostState = value;
    this.isPostTypeSelected = true;
    this.typePostLabel =
      value === CreationPostState.BUG_POST
        ? 'Bug'
        : value === CreationPostState.NEWS_POST
        ? 'News'
        : 'Feedback';
  }
  /**
   * Create the post
   */
  public create(): void {
    if (this.postFrom.invalid) {
      Object.keys(this.postFrom.controls).forEach(key => {
        this.postFrom.get(key)?.markAsDirty();
      });
      return;
    }
    this.dialogRef.close({ ...this.postFrom.value, picture: this.croppedImage });
  }

  public fileChangeEvent(event: Event): void {
    this.imageSelected = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  goBackFromEditor(): void {
    this.imageSelected = null;
    this.croppedImage = null;
  }

  applyCropping(): void {
    this.imageSelected = null;
  }
}
