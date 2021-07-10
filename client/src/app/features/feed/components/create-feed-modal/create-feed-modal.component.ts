import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';
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
  nameExists = false;
  creationSteps = {
    nameStepCompleted: false,
    detailsStepCompleted: false,
    profileUploadStepCompleted: false
  };
  nodefeedToCreate: NodefeedModel = {
    title: '',
    name: '',
    description: '',
    followersCounter: 0,
    postsCounter: 0
  };

  constructor(public nodefeedService: NodefeedService, private modalRef: MatDialogRef<CreateFeedModalComponent>) {}

  ngOnInit(): void {
    this.nodefeedNameControl = new FormControl('', { updateOn: 'blur', validators: [Validators.minLength(3)] });
    this.nodefeedNameControl.valueChanges
      .pipe(
        tap((value) => console.log(value)),
        filter((nodeFeedName: string) => nodeFeedName.length >= 3),
        switchMap((nodeFeedName) => this.nodefeedService.getNodeFeed$(nodeFeedName))
      )
      .subscribe((nodefeed) => {
        this.nameExists = !!nodefeed;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.progressStep = '25%'), 300);
  }

  nameStepNodefeedPage(): void {
    // I need to take the title and remove the spaces
    this.nodefeedService.getNodeFeed$(this.nodefeedNameControl.value).subscribe((nodefeed) => {
      this.nameExists = !!nodefeed;
      this.creationSteps.nameStepCompleted = !this.nameExists;

      //TODO : complete error handling
      //TODO: advance progress step
    });
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
