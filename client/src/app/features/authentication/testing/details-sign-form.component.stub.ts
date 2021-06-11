import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignInDetailsModel } from '../models/sign-in-details.model';

/**
 * Form dealing with additional information in the signup process
 */
@Component({
  selector: 'app-details-sign-form',
  template: ''
})
export class DetailsSignFormStubComponent {
  @Output() updatedDetails = new EventEmitter<Partial<SignInDetailsModel>>(); //+ gender
  @Output() validDOB = new EventEmitter<boolean>(); //validation
  dobForm!: FormGroup;

  invalidDOB(): boolean {
    return false;
  }

  markAsDirty(): void {
    return;
  }
}
