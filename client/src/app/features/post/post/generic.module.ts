import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericComponent } from './components/generic/generic.component';
import { GenericRoutingModule } from './generic-routing.module';

@NgModule({
  declarations: [GenericComponent],
  exports: [GenericComponent],
  imports: [CommonModule, GenericRoutingModule]
})
export class GenericModule {}
