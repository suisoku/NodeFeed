import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hideInputPassword = true;

  constructor() {}

  shit() {
    console.log(true);
  }
  ngOnInit(): void {}
}
