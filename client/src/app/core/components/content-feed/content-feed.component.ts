import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-content-feed',
  templateUrl: './content-feed.component.html',
  styleUrls: ['./content-feed.component.scss']
})
export class ContentFeedComponent implements OnInit {

  constructor(private PostsService: PostsService) { }

  ngOnInit(): void {
  }


}
