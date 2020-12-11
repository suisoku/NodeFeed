import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [NavbarComponent, SidenavComponent, ContentFeedComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    SidenavComponent,
    ContentFeedComponent
  ]
})
export class CoreModule { }
