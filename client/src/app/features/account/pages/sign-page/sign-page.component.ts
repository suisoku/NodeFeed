import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements AfterViewInit {
  @ViewChild('signin', { read: ElementRef }) signinInput!: ElementRef<HTMLInputElement>;
  //@ViewChild('signup', { read: ElementRef }) signupInput!: ElementRef<HTMLInputElement>;
  signDisplayMode = true;

  ngAfterViewInit(): void {
    console.log(this.calculateStartScale(this.signinInput.nativeElement));
  }

  calculateStartScale(startElement: HTMLInputElement): { x: number; y: number } {
    const start = startElement.getBoundingClientRect();
    return {
      x: 1,
      y: start.height * 0.3
    };
  }
}
