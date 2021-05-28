import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarePostComponent } from './bare-post.component';

describe('BarePostComponent', () => {
  let component: BarePostComponent;
  let fixture: ComponentFixture<BarePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarePostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
