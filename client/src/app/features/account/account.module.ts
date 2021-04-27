import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountBarComponent } from './components/account-bar/account-bar.component';
import { BasicSignFormComponent } from './components/basic-sign-form/basic-sign-form.component';
import { SignFollowUpComponent } from './components/sign-follow-up/sign-follow-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
@NgModule({
  declarations: [
    SignFollowUpComponent, 
    SignPageComponent,
    SignInComponent,
    BasicSignFormComponent,
    AccountBarComponent,
    VerifyEmailPageComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
