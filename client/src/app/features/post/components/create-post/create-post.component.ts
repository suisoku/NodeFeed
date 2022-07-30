/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, take } from 'rxjs';
import { NodefeedModel } from 'src/app/core/models/nodefeed.model';
import { NodefeedService } from 'src/app/core/services/nodefeed.service';
import { CreationPostState } from '../../enums/creation-post-state';
import { BarePostModel } from '../../models/bare-post.model';
import { PostsService } from '../../services/posts.service';

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

  nodefeeds$: Observable<NodefeedModel[]> = this.nodeFeedService.getNodeFeeds$();

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private nodeFeedService: NodefeedService,
    private postsService: PostsService
  ) {
    this.currentCreationPostState = CreationPostState.CHOOSE_POST_TYPE;
    this.isPostTypeSelected = false;
    this.typePostLabel = '';
    this.postFrom = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      picture: new FormControl(this.croppedImage),
      nodefeed: new FormControl(this.data, [Validators.required])
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
      this.postFrom.controls.nodefeed.markAsTouched();
      return;
    }
    const post: BarePostModel = {
      author: 'Toudom',
      content: this.postFrom.value.description,
      title: this.postFrom.value.title,
      nodefeed: this.postFrom.value.nodefeed,
      date: new Date(),
      commentCounter: 0,
      likeCounter: 0
    };
    this.postsService.createBarePost(post);
    this.dialogRef.close();
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
