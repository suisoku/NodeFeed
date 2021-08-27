/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable, Observer } from 'rxjs';

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
  @Output() save = new EventEmitter<Blob | null>();

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
    if (!this.croppedImage) {
      this.save.emit(null);
      return;
    }
    this.base64toBlob$(this.croppedImage).subscribe((blob: Blob) => this.save.emit(blob));
  }

  /* Method to convert Base64Data Url as Image Blob */
  private base64toBlob$(dataURI: string): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      const rawDataB64 = dataURI.split(',')[1];
      const byteString: string = window.atob(rawDataB64);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      observer.next(blob);
      observer.complete();
    });
  }
}
