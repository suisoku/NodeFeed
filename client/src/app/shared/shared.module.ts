import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortNumberPipe } from './pipes/short-number.pipe';

@NgModule({
  declarations: [ShortNumberPipe],
  imports: [CommonModule],
  exports: [ShortNumberPipe, CommonModule]
})
export class SharedModule {}
