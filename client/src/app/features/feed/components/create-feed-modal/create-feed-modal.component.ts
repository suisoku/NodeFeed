import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NodefeedModel } from 'src/app/core/models/nodefeed.model';
import { NodefeedService } from 'src/app/core/services/nodefeed.service';

/**
 * Modal component for nodefeed page creation
 */
@Component({
  templateUrl: './create-feed-modal.component.html',
  styleUrls: ['./create-feed-modal.component.scss']
})
export class CreateFeedModalComponent implements OnInit, AfterViewInit {
  nodefeedNameControl!: FormControl;
  progressStep = '0%';

  constructor(public nodefeedService: NodefeedService, private modalRef: MatDialogRef<CreateFeedModalComponent>) {}

  ngOnInit(): void {
    this.nodefeedNameControl = new FormCossntrol('', { updateOn: 'blur', validators: [Validators.minLength(3)] });
    this.nodefeedNameControl.valueChanges.subscribe((name: string) => {
      //TODO: add validator to ban special characters
      this.nodefeedService.getNodeFeed$(name).subscribe((nodefeed: NodefeedModel) =>)
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.progressStep = '25%'), 300);
  }

  closeModal(): void {
    this.modalRef.close('Pizza!');
  }
}
