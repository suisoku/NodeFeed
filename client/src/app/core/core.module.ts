import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericModule } from '../features/generic/generic.module';
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
  imports: [CommonModule, SharedModule, GenericModule],
  exports: [
    NavbarComponent,
    SidenavComponent,
    ContentFeedComponent,
    PageHeaderComponent
  ]
})
export class CoreModule {}
