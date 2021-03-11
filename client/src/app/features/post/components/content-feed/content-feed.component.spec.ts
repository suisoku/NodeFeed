import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentFeedComponent } from './content-feed.component';

describe('ContentFeedComponent', () => {
  let component: ContentFeedComponent;
  let fixture: ComponentFixture<ContentFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentFeedComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
