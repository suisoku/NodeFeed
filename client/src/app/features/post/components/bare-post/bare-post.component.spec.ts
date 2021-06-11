import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsService } from '../../services/posts.service';
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

    component.barePost = {
      author: 'fakeAuthor',
      commentCounter: 10,
      content: 'fake content',
      date: new Date(),
      likeCounter: 11,
      nodefeed: 'fakeNodeFeedUid',
      title: 'fake title'
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
