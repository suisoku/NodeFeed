import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugComponent } from './bug.component';



@NgModule({
  declarations: [
    BugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BugComponent
  ]
})
export class BugModule { }
