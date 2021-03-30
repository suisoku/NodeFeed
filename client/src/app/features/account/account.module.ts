import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { SignFollowUpComponent } from './components/sign-follow-up/sign-follow-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignPageComponent } from './pages/sign-page/sign-page.component';
@NgModule({
  declarations: [
    SignFollowUpComponent, 
    SignPageComponent,
    SignInComponent
  ],
  imports: [
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
