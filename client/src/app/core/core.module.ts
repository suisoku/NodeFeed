import { NgModule } from '@angular/core';
import { AuthenticationModule } from '../features/authentication/authentication.module';
import { PostModule } from '../features/post/post.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { WelcomeComponent } from './pages/landing-page/welcome-component/welcome.component';
import { IntroductionComponent } from './pages/landing-page/introduction-component/introduction.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    PageHeaderComponent,
    HomePageComponent,
    LandingPageComponent,
    WelcomeComponent,
    IntroductionComponent
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    PostModule,
    AuthenticationModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
    PageHeaderComponent
  ]
})
export class CoreModule {}
