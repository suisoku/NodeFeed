import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Pure componnent that only holds a template and some minor features,
 * basic-sign form controls are hold in parent component
 */
@Component({
  selector: 'app-basic-sign-form',
  templateUrl: './basic-sign-form.component.html',
  styleUrls: ['./basic-sign-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSignFormComponent {
  @Input() parentForm!: FormGroup;

  get hidePassword(): boolean {
    return this.parentForm.get('hiddenPassword')?.value as boolean;
  }

  set hidePassword(hide: boolean) {
    this.parentForm.get('hiddenPassword')?.setValue(hide);
  }

  isInvalidEmail(): boolean {
    const hasErrors = !!this.parentForm.get('email')?.hasError('email');
    const isTouched = !!this.parentForm.get('email')?.touched;

    return hasErrors && isTouched;
  }
}
