import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoggedGuard } from '../features/account/guards/google-logged.guard';
import { SuperLoggedGuard } from '../features/account/guards/super-logged.guard';
import { ProfilePageComponent } from '../features/account/pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [GoogleLoggedGuard] },
  { path: 'user', component: ProfilePageComponent, canActivate: [SuperLoggedGuard, GoogleLoggedGuard]},
  {
    path: 'sign',
    loadChildren: () => import('../features/account/account.module').then((m) => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
