import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valor-inicial',
  templateUrl: './valor-inicial.component.html',
  styleUrls: ['./valor-inicial.component.scss']
})
export class ValorInicialComponent implements OnInit {
  n1: number = 10;
  x1:number[] = [0]
  y1:number[] = [9]
  calculando1:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.recalcularEuler1();
  }

  flinha1(x:number){
    return 2*(x-3)
  }

  recalcularEuler1(){
    this.calculando1 = true;
    let h = 8/this.n1;
    this.x1=[this.x1[0]]
    this.y1 = [this.y1[0]]
    for(let i = 1;i<this.n1;i++){
      this.x1.push(+(this.x1[0]+i*h).toFixed(2));
      this.y1.push(+(this.y1[i-1]+h*this.flinha1(this.x1[i-1])).toFixed(2))
    }
    setTimeout(() =>{this.calculando1 = false;},1)
    console.log(this.x1)
    console.log(this.y1)
  }

}
