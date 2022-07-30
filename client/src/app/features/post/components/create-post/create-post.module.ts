import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    ImageCropperModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [CreatePostComponent]
})
export class CreatePostModule {}
