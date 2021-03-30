import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PostModule } from '../features/post/post.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CoreRoutingModule } from './core-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    PageHeaderComponent,
    HomePageComponent 
  ],
  imports: [CoreRoutingModule, SharedModule, PostModule],
  exports: [
    NavbarComponent,
    SidenavComponent,
    PageHeaderComponent
  ]
})
export class CoreModule {}
