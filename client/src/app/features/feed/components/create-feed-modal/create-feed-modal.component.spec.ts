import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedModalComponent } from './create-feed-modal.component';

describe('CreateFeedModalComponent', () => {
  let component: CreateFeedModalComponent;
  let fixture: ComponentFixture<CreateFeedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFeedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
