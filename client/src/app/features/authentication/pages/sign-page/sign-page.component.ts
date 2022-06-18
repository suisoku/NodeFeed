import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CredentialsSettingsModel } from '../../models/credential-settings.model';

/**
 * Sign in and Sign up main page view
 */
@Component({
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.scss']
})
export class SignPageComponent implements OnInit {
  signInDisplayMode!: boolean;
  collapsedSignBox = false;
  persistedCredentials: CredentialsSettingsModel = { email: '', password: '', hiddenPassword: true };
  hiddenPassword = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      if (urlSegment[0].path === 'signup') this.signInDisplayMode = false;
      else if (urlSegment[0].path === 'signin') this.signInDisplayMode = true;
      //else throw new Error('urlSegment is faulty'); // TODO: better message throw error
    });
  }

  switchSignComponent(): void {
    if (this.collapsedSignBox) {
      this.signInDisplayMode = !this.signInDisplayMode;
      this.collapsedSignBox = false;
    }
  }

  collapseSignBox(dataCredentials: CredentialsSettingsModel): void {
    this.persistedCredentials = dataCredentials;
    this.collapsedSignBox = true;
  }
}
