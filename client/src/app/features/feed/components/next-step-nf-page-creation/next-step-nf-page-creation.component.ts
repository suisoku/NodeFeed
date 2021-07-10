import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NodefeedModel } from 'src/app/core/models/nodefeed.model';
import { FormHelper } from 'src/app/core/utilities/form-helper';

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
  @Input() nodefeedModel!: NodefeedModel;
  @Output() nodefeedModelChange = new EventEmitter<NodefeedModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();

  detailsPageCreationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.detailsPageCreationForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      categories: [''],
      link: ['']
    });
  }

  fillingDetailsStep(): void {
    FormHelper.markGroupDirty(this.detailsPageCreationForm);
    this.nodefeedModel.description = this.detailsPageCreationForm.get('description')?.value as string;
    this.nodefeedModel.tags = this.detailsPageCreationForm.get('categories')?.value as string;
    this.nodefeedModel.officialLink = this.detailsPageCreationForm.get('link')?.value as string;

    if (this.detailsPageCreationForm.valid) {
      this.nodefeedModelChange.emit(this.nodefeedModel);
      this.completed.emit();
    }
  }
}
