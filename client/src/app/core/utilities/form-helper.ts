import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Provides useful functions for angular formgroups
 */
export class FormHelper {
  static markGroupDirty(form: FormGroup | FormArray): void {
    //
    Object.keys(form.controls).forEach(key => {
      switch (form.get(key)?.constructor.name) {
        case 'FormControl':
          FormHelper.markControlDirty(form.get(key) as FormControl);
          break;
        case 'FormGroup':
          FormHelper.markGroupDirty(form.get(key) as FormGroup);
          break;
        case 'FormArray':
          FormHelper.markGroupDirty(form.get(key) as FormArray);
          break;
      }
    });
  }

  static markControlDirty(formControl: FormControl): void {
    formControl.markAsDirty();
  }
}
