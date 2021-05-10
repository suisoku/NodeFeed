import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSignFormComponent } from './details-sign-form.component';

describe('DetailsSignFormComponent', () => {
  let component: DetailsSignFormComponent;
  let fixture: ComponentFixture<DetailsSignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
