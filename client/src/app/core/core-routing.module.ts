import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoggedGuard } from '../features/authentication/guards/google-logged.guard';
import { SuperLoggedGuard } from '../features/authentication/guards/super-logged.guard';
import { ProfilePageComponent } from '../features/authentication/pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NodeFeedPageComponent } from './pages/node-feed-page/node-feed-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [GoogleLoggedGuard] },
  { path: 'nf/:id', component: NodeFeedPageComponent, canActivate: [GoogleLoggedGuard] },
  { path: 'user', component: ProfilePageComponent, canActivate: [SuperLoggedGuard, GoogleLoggedGuard]},
  {
    path: 'sign',
    loadChildren: () => import('../features/authentication/authentication.module').then((m) => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
