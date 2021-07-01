import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateFeedModalComponent } from './components/create-feed-modal/create-feed-modal.component';
import { FeedRoutingModule } from './feed-routing.module';

@NgModule({
  declarations: [CreateFeedModalComponent],
  imports: [CommonModule, SharedModule,FeedRoutingModule]
})
export class FeedModule {}
