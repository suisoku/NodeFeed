import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [ShortNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  exports: [
    ShortNumberPipe,
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class SharedModule {}
