import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignFollowUpStubComponent } from '../../testing/sign-follow-up.component.stub';
import { SignPageComponent } from './sign-page.component';

describe('SignPageComponent', () => {
  let component: SignPageComponent;
  let fixture: ComponentFixture<SignPageComponent>;

  beforeEach(async () => {
    const rendererProvider = jasmine.createSpyObj('Renderer2', ['removeClass']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SignPageComponent, SignFollowUpStubComponent],
      providers: [{ provide: Renderer2, use: rendererProvider }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
