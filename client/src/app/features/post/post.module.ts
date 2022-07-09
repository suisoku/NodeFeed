import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarePostComponent } from './components/bare-post/bare-post.component';
import { PostRoutingModule } from './post-routing.module';
import { CreatePostModule } from './components/create-post/create-post.module';
import { NewsModule } from './components/news/news.module';

@NgModule({
  declarations: [BarePostComponent],
  imports: [CommonModule, SharedModule, PostRoutingModule, CreatePostModule, NewsModule],
  exports: [BarePostComponent],
})
export class PostModule {
  //lol
}
