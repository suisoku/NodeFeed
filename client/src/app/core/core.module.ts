import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ContentFeedComponent } from './components/content-feed/content-feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    ContentFeedComponent,
    PageHeaderComponent,
    ShortNumberPipe
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    NavbarComponent,
    SidenavComponent,
    ContentFeedComponent,
    PageHeaderComponent
  ]
})
export class CoreModule {}
