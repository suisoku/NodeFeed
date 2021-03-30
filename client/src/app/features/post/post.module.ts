import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarePostComponent } from './components/bare-post/bare-post.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [BarePostComponent],
  imports: [CommonModule, SharedModule, PostRoutingModule],
  exports: [BarePostComponent],
})
export class PostModule {
  //lol
}
