import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortNumberPipe } from './pipes/short-number.pipe';

@NgModule({
  declarations: [ShortNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ShortNumberPipe,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
