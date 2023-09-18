import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SustentationComponent } from './sustentation/sustentation.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  {path:'', 
    children:[
      {
        path:'calculator', component:CalculatorComponent,
        data:{title:'Calculator'}
      },
      {
        path:'sustentation', component:SustentationComponent,
        data:{title:'Sustentation'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }
