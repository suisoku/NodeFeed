import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignPageComponent } from './pages/sign-page/sign-page.component';

const routes: Routes = [{ path: '', component: SignPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
