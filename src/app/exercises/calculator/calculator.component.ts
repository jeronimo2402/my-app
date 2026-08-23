import { Component, ChangeDetectionStrategy } from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'
import { evaluateExpression } from './safe-expression';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CalculatorComponent {
  oper = '';
  done=0

  constructor(private router:Router){}

  write(value:string){
    if (this.done==1){
      this.oper=''
      this.done=0
    }
    if (value=='x'){
      value='*'
    }else if(value=='÷'){
      value='/'
    }
    this.oper+=value;
  }
  deleteAll(){
    this.oper='';
  }
  operation(){
    let exp=this.oper;
    try{
      this.oper=String(evaluateExpression(exp));
      this.done=1
    }catch(e){
      Swal.fire({
        title:"Syntax Error",
        icon:"error"
      })
      this.oper=''
    }
  }
  
  navegar(){
    this.router.navigate(['/exercises/sustentation'])
  }
}
