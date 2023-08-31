import { Component } from '@angular/core';
import {Parser} from 'expr-eval';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  oper = '';
  done=0

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
    var parser = new Parser();
    try{
      var expr= parser.parse(exp);
      this.oper=expr.evaluate({});
      this.done=1
    }catch(e){
      Swal.fire({
        title:"Syntax Error",
        icon:"error"
      })
      this.oper=''
    }
    
  }
}




