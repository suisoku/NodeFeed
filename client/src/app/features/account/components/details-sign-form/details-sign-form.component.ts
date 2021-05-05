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
      birthMonth: ['', [Validators.required, Validators.pattern('^([1-9]|[0-1][0-2])$')]], //validators never prevent only invalidates
      birthDay: ['', [Validators.required, Validators.max(12)]],
      birthYear: [],
      gender: []
    });

    this.dobForm.valueChanges.subscribe((values: Partial<SignInDetailsModel>) => {
      //mount date object
      const newDob = new Date(Number(values.birthYear), Number(values.birthMonth), Number(values.birthDay));

      //verify it parsed correctly and send
      //catch errors
      console.log(values);
      console.log(newDob.toString());
      console.log(newDob.getTime());
    });

    this.dobForm.statusChanges.subscribe((value: string) => this.validDOB.emit(value === 'VALID'));
  }
}
