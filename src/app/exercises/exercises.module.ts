import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';
import { SustentationComponent } from './sustentation/sustentation.component';


@NgModule({
  declarations: [
    CalculatorComponent,
    SustentationComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule
  ]
})
export class ExercisesModule { }
