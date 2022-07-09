import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [CreatePostComponent]
})
export class CreatePostModule {}
