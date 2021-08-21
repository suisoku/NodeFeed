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
    officialLink: '',
    tags: '',
    description: '',
    followersCounter: 0,
    postsCounter: 0
  };

  constructor(public nodefeedService: NodefeedService, private modalRef: MatDialogRef<CreateFeedModalComponent>) {}

  ngOnInit(): void {
    this.nodefeedNameControl = new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.minLength(3), Validators.required]
    });
    this.nodefeedNameControl.valueChanges
      .pipe(
        tap(() => (this.nameExists = false)),
        filter((nodeFeedName: string) => nodeFeedName.length >= 3),
        switchMap((nodeFeedName) => {
          const nodeFeedId = nodeFeedName.replace(/ /g, '.'); //TODO: more robust regex, handle edge cases
          return this.nodefeedService.getNodeFeed$(nodeFeedId);
        })
      )
      .subscribe((nodefeed) => {
        this.nameExists = !!nodefeed;
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => (this.progressStep = '25%'), 300);
  }

  nameStepNodefeedPage(): void {
    //TODO: optmizable ? doing a request although we made one on blur
    const nodeFeedId = (this.nodefeedNameControl.value as string).replace(/ /g, '_');
    if (this.nodefeedNameControl.invalid) {
      this.nodefeedNameControl.markAsDirty();
      return;
    }
    this.nodefeedService.getNodeFeed$(nodeFeedId).subscribe((nodefeed) => {
      if (nodefeed == null) {
        this.nodefeedToCreate.title = this.nodefeedNameControl.value as string;
        this.nodefeedToCreate.name = nodeFeedId;
        this.creationSteps.nameStepCompleted = true;

        this.progressStep = '50%';
      }
    });
  }

  sendToProfileUploadStep(): void {
    this.creationSteps.detailsStepCompleted = true;
    this.progressStep = '80%';
  }

  createNodeFeedPage(dataPicture: string | null): void {
    //on event completion
    console.log('info', this.nodefeedToCreate, dataPicture?.length);
    this.progressStep = '90%';
    this.nodefeedService
      .createNodeFeed(this.nodefeedToCreate)
      .then(() => {
        if (!dataPicture) {
          this.progressStep = '100%';
          this.closeModal();
          return;
        }
        this.nodefeedService
          .storeNodefeedPicture(this.nodefeedToCreate.name, dataPicture)
          .then(() => {
            this.progressStep = '100%';
            this.closeModal();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  closeModal(): void {
    this.modalRef.close();
  }
}
