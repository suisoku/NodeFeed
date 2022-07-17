import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, MatDialogModule, SharedModule],
  exports: [CreatePostComponent]
})
export class CreatePostModule {}
