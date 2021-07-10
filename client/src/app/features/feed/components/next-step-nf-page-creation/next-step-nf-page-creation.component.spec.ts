import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextStepNfPageCreationComponent } from './next-step-nf-page-creation.component';

describe('NextStepNfPageCreationComponent', () => {
  let component: NextStepNfPageCreationComponent;
  let fixture: ComponentFixture<NextStepNfPageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextStepNfPageCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextStepNfPageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
