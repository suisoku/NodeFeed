import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { FirstCharPipe } from './pipes/first-char.pipe';

@NgModule({
  declarations: [ShortNumberPipe, FirstCharPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    //Material Imports
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  exports: [
    ShortNumberPipe,
    CommonModule,
    ReactiveFormsModule,

    //Material Exports
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    FirstCharPipe
  ]
})
export class SharedModule {}
