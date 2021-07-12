/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

/**
 * Profile picture uploader step view (last step of nodefeed page creation process)
 */
@Component({
  selector: 'app-upload-pic-step-page-creation',
  templateUrl: './upload-pic-step-page-creation.component.html',
  styleUrls: ['./upload-pic-step-page-creation.component.scss']
})
export class UploadPicStepPageCreationComponent {
  @Input() nodeFeedName!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<string | null>();

  imageSelected: Event | null = null;
  croppingApplied = false;
  croppedImage?: string | null = null;
  // constructor() {}

  // ngOnInit(): void {}

  getNameInitial(): string {
    return this.nodeFeedName.charAt(0) || 'A';
  }

  fileChangeEvent(event: Event): void {
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

  completeUpload(): void {
    //TODO: compress image
    if (this.croppedImage) {
      console.log(this.croppedImage.length);
    }
    this.save.emit(this.croppedImage);
  }
}
