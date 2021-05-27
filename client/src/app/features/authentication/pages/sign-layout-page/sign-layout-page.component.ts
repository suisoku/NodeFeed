import { Component, Renderer2 } from '@angular/core';

/** Page view Providing a left side presentation and a router-outlet used by all the authentication templates */
@Component({
  templateUrl: './sign-layout-page.component.html',
  styleUrls: ['./sign-layout-page.component.scss']
})
export class SignLayoutPageComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.querySelector('html'), 'sign-layout-background');
  }
}
