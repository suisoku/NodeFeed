import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInDetailsModel } from '../../models/sign-in-details.model';

@Component({
  selector: 'app-details-sign-form',
  templateUrl: './details-sign-form.component.html',
  styleUrls: ['./details-sign-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsSignFormComponent implements OnInit {
  @Output() updatedDetails = new EventEmitter<Partial<SignInDetailsModel>>(); //+ gender
  @Output() validDOB = new EventEmitter<boolean>(); //validation
  dobForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dobForm = this.formBuilder.group({
      birthMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      birthDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      gender: ['', Validators.required]
    });

    this.dobForm.valueChanges.subscribe((values: Partial<SignInDetailsModel>) => {
      if (this.dobForm.valid) {
        this.updatedDetails.emit(values);
      }
    });

    this.dobForm.statusChanges.subscribe((status: string) => this.validDOB.emit(status === 'VALID'));
  }

  invalidDOB(): boolean {
    const birthKeys = Object.keys(this.dobForm.controls).filter((keyControl: string) => keyControl.includes('birth'));
    const hasErrors = birthKeys.some((keyControl) => this.dobForm.get(keyControl)?.errors);
    const isAllTouched = birthKeys.every((keyControl: string) => this.dobForm.get(keyControl)?.touched);

    return hasErrors && isAllTouched;
  }
}
