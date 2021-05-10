import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { BasicSignFormComponent } from './components/basic-sign-form/basic-sign-form.component';
import { SignFollowUpComponent } from './components/sign-follow-up/sign-follow-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DetailsSignFormComponent } from './components/details-sign-form/details-sign-form.component';
import { GoogleSignPageComponent } from './pages/google-sign-page/google-sign-page.component';
import { SignLayoutPageComponent } from './pages/sign-layout-page/sign-layout-page.component';
@NgModule({
  declarations: [
    SignFollowUpComponent, 
    SignPageComponent,
    SignInComponent,
    BasicSignFormComponent,
    VerifyEmailPageComponent,
    AccountMenuComponent,
    ProfilePageComponent,
    DetailsSignFormComponent,
    GoogleSignPageComponent,
    SignLayoutPageComponent
  ],
  exports: [
    AccountMenuComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
