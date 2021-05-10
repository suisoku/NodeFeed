import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignPageComponent } from './google-sign-page.component';

describe('GoogleSignPageComponent', () => {
  let component: GoogleSignPageComponent;
  let fixture: ComponentFixture<GoogleSignPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSignPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
