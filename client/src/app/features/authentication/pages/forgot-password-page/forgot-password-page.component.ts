import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPwdForm!: FormGroup;
  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.forgotPwdForm = this._formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }]
    });
  }

  isInvalidEmail(): boolean {
    const hasErrors = !!this.forgotPwdForm.get('email')?.hasError('email');
    const isTouched = !!this.forgotPwdForm.get('email')?.touched;

    return hasErrors && isTouched;
  }

  sendResetEmail(): void {
    const email = this.forgotPwdForm.get('email')?.value as string;
    this._auth
      .forgotPassword(email)
      .then(() => {
        this.displaySuccessMessage();
        setTimeout(() => this.cancel(), 1500);
      }) //toaster
      .catch((error) => console.log(error));
  }
  cancel(): void {
    void this._router.navigate(['/sign/signin']);
  }

  displaySuccessMessage(): void {
    this._snackBar.open('An email to reset your password was sent', '', {
      duration: 3500,
      panelClass: ['nf-success-snackbar']
    });
  }
}
