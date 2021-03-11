import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';

const routes: Routes = [{ path: '', component: ContentFeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericRoutingModule {}
