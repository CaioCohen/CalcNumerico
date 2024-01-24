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
  x2:number[] = []
  y2:number[] = []
  calculando1:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.recalcularEuler1();
    this.analitico1();
  }

  flinha1(x:number){
    return 2*(x-3)
  }
  f(x:number){
    return (x-3)**2
  }

  analitico1(){
    let h = 8/1000
    for(let i = 0; i < 1000;i++){
      this.x2.push(i*h);
      this.y2.push(this.f(this.x2[i]))
    }
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
