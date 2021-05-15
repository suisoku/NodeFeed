import { Component, Renderer2 } from '@angular/core';

@Component({
  templateUrl: './sign-layout-page.component.html',
  styleUrls: ['./sign-layout-page.component.scss']
})
export class SignLayoutPageComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.querySelector('html'), 'sign-layout-background');
  }
}
