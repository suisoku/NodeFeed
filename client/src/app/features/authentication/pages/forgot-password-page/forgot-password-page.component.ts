import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPwdForm!: FormGroup;

  constructor(private _auth: AuthenticationService, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    const optionControls = { validators: [Validators.required, Validators.email], updateOn: 'blur' } as AbstractControlOptions;
    this.forgotPwdForm.addControl('email', new FormControl('', optionControls));
  }

  isInvalidEmail(): boolean {
    const hasErrors = !!this.forgotPwdForm.get('email')?.hasError('email');
    const isTouched = !!this.forgotPwdForm.get('email')?.touched;

    return hasErrors && isTouched;
  }

  sendResetEmail(): void {
    const email = this.forgotPwdForm.get('email')?.value as string;
    void this._auth.forgotPassword(email);
  }
  cancel(): void {
    void this._router.navigate(['/sign/signin']);
  }
}
