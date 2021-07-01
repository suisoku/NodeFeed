import { AfterViewInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Modal component for nodefeed page creation
 */
@Component({
  templateUrl: './create-feed-modal.component.html',
  styleUrls: ['./create-feed-modal.component.scss']
})
export class CreateFeedModalComponent implements AfterViewInit {
  progressStep = '0%';

  constructor(public modalRef: MatDialogRef<CreateFeedModalComponent>) {}

  ngAfterViewInit(): void {
    setTimeout(() => (this.progressStep = '25%'), 300);
  }

  closeModal(): void {
    this.modalRef.close('Pizza!');
  }
}
