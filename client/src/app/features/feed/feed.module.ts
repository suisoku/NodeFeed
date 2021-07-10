import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateFeedModalComponent } from './components/create-feed-modal/create-feed-modal.component';
import { FeedRoutingModule } from './feed-routing.module';
import { NextStepNfPageCreationComponent } from './components/next-step-nf-page-creation/next-step-nf-page-creation.component';
import { UploadPicStepPageCreationComponent } from './components/upload-pic-step-page-creation/upload-pic-step-page-creation.component';

@NgModule({
  declarations: [CreateFeedModalComponent, NextStepNfPageCreationComponent, UploadPicStepPageCreationComponent],
  imports: [CommonModule, SharedModule,FeedRoutingModule]
})
export class FeedModule {}
