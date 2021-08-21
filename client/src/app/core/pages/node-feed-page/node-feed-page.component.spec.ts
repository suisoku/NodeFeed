import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeFeedPageComponent } from './node-feed-page.component';

describe('NodeFeedPageComponent', () => {
  let component: NodeFeedPageComponent;
  let fixture: ComponentFixture<NodeFeedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeFeedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeFeedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
