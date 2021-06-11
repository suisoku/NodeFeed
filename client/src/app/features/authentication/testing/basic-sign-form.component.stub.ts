import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Pure componnent that only holds a template and some minor features,
 * basic-sign form controls are hold in parent component
 */
@Component({
  selector: 'app-basic-sign-form',
  template: ''
})
export class BasicSignFormStubComponent {
  @Input() parentForm!: FormGroup;

  get hidePassword(): boolean {
    return true;
  }

  set hidePassword(hide: boolean) {
    return;
  }

  isInvalidEmail(): boolean {
    return false;
  }
}
