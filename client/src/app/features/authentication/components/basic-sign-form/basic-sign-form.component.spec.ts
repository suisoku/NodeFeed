/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicSignFormComponent } from './basic-sign-form.component';

describe('BasicSignFormComponent', () => {
  let component: BasicSignFormComponent;
  let fixture: ComponentFixture<BasicSignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicSignFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicSignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
