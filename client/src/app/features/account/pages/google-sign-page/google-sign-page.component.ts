import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './google-sign-page.component.html',
  styleUrls: ['./google-sign-page.component.scss']
})
export class GoogleSignPageComponent implements AfterViewInit {
  progressStep = '0%';

  constructor() {}

  ngAfterViewInit(): void {
    //Apply loading in progress effect
    setTimeout(() => (this.progressStep = '50%'), 300);
  }

  cancelRegistration(): void {
    //
  }

  completeRegistration(): void {
    //Apply loading completed progress effect
    setTimeout(() => (this.progressStep = '100%'), 300);
  }
}
