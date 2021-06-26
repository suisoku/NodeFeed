import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseMockHelper } from 'src/app/core/testing/firebase-mock-helper';
import { AuthenticationService } from '../../services/authentication.service';
import { DetailsSignFormStubComponent } from '../../testing/details-sign-form.component.stub';
import { GoogleSignPageComponent } from './google-sign-page.component';

describe('GoogleSignPageComponent', () => {
  let component: GoogleSignPageComponent;
  let fixture: ComponentFixture<GoogleSignPageComponent>;

  let router: jasmine.SpyObj<Router>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const routeDataMock: Observable<Data> = of({ user: FirebaseMockHelper.userMock() });

    const routerProvider = jasmine.createSpyObj('Router', ['navigate']);
    const routeProvider = jasmine.createSpyObj('ActivatedRoute', [], { data: routeDataMock });
    const authServiceProvider = jasmine.createSpyObj('AuthenticationService', ['signOut', 'completeGoogleSignup']);

    await TestBed.configureTestingModule({
      declarations: [GoogleSignPageComponent, DetailsSignFormStubComponent],
      providers: [
        { provide: Router, useValue: routerProvider },
        { provide: ActivatedRoute, useValue: routeProvider },
        { provide: AuthenticationService, useValue: authServiceProvider }
      ]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
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
