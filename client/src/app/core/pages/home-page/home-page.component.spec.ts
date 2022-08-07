import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsService } from 'src/app/features/post/services/posts.service';
import { BarePostStubComponent } from 'src/app/features/post/testing/bare-post.component.stub';
import { NodefeedService } from '../../services/nodefeed.service';
import { NavbarStubComponent } from '../../testing/navbar.component.stub';
import { SidenavStubComponent } from '../../testing/sidenav.component.stub';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    const nodeFeedServiceProvider = jasmine.createSpyObj('NodefeedService', [
      'createNodeFeed',
      'getNodeFeed$'
    ]);
    const postsServiceProvider = jasmine.createSpyObj('PostsService', [
      'createBarePost',
      'getBarePosts$'
    ]);
    const rendererProvider = jasmine.createSpyObj('Renderer2', ['removeClass']);

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatExpansionModule],
      declarations: [
        HomePageComponent,
        BarePostStubComponent,
        SidenavStubComponent,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        NavbarStubComponent
      ],
      providers: [
        { provide: NodefeedService, useValue: nodeFeedServiceProvider },
        { provide: PostsService, useValue: postsServiceProvider },
        { provide: Renderer2, useValue: rendererProvider }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
