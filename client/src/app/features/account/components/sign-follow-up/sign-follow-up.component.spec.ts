import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignFollowUpComponent } from './sign-follow-up.component';

describe('SignFollowUpComponent', () => {
  let component: SignFollowUpComponent;
  let fixture: ComponentFixture<SignFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignFollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
