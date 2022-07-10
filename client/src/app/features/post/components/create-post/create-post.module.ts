import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from './create-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewsModule } from '../news/news.module';
import { BugModule } from '../bug/bug.module';
import { FeedbackModule } from '../feedback/feedback.module';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [CommonModule, MatDialogModule, NewsModule, BugModule, FeedbackModule],
  exports: [CreatePostComponent]
})
export class CreatePostModule {}
