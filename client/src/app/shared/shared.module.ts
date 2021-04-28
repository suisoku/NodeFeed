import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [ShortNumberPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    //Material Imports
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    ShortNumberPipe,
    CommonModule,
    ReactiveFormsModule,

    //Material Exports
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class SharedModule {}
