import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * Next step view of the page creation modal
 */
@Component({
  selector: 'app-next-step-nf-page-creation',
  templateUrl: './next-step-nf-page-creation.component.html',
  styleUrls: ['./next-step-nf-page-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextStepNfPageCreationComponent implements OnInit {
  descriptionFormControl!: FormControl;

  constructor() {
    //
  }

  ngOnInit(): void {
    this.descriptionFormControl = new FormControl('', { updateOn: 'blur', validators: [Validators.required] });
  }
}
