import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLayoutPageComponent } from './sign-layout-page.component';

describe('SignLayoutPageComponent', () => {
  let component: SignLayoutPageComponent;
  let fixture: ComponentFixture<SignLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignLayoutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
