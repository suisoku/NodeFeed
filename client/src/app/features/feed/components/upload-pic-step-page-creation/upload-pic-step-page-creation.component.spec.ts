import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPicStepPageCreationComponent } from './upload-pic-step-page-creation.component';

describe('UploadPicStepPageCreationComponent', () => {
  let component: UploadPicStepPageCreationComponent;
  let fixture: ComponentFixture<UploadPicStepPageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPicStepPageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPicStepPageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
