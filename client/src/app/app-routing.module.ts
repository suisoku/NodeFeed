import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'feed', loadChildren: () => import('./features/feed/feed.module').then(m => m.FeedModule) }
];

@NgModule({
  //for route tracing add  enableTracing: true to navigation extra doc 
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
