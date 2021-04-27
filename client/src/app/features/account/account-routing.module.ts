import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign/signin']);

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignPageComponent },
  {
    path: 'signup', component: SignPageComponent,
    children: [{ path: 'verify-email', component: VerifyEmailPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
