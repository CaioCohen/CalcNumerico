import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valor-inicial',
  templateUrl: './valor-inicial.component.html',
  styleUrls: ['./valor-inicial.component.scss']
})
export class ValorInicialComponent implements OnInit {
  n1: number = 10;
  n2: number = 10;
  x1:number[] = [0]
  y1:number[] = [9]
  x2:number[] = []
  y2:number[] = []
  xA:number[] = []
  yA:number[] = []
  calculando1:boolean = true;
  calculando2:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.recalcularEuler1();
    this.analitico1();
    this.calcularEulerMelhorado();
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
      this.xA.push(i*h);
      this.yA.push(this.f(this.xA[i]))
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
  }

  calcularEulerMelhorado(){
    this.calculando2 = true;
    let h = 8/this.n2;
    this.x2=[this.x1[0]]
    this.y2 = [this.y1[0]]
    for(let i = 1;i<this.n2;i++){
      this.x2.push(+(this.x2[0]+i*h).toFixed(2));
      let k1 = h*this.flinha1(this.x2[i-1])
      let k2 = h*this.flinha1(this.x2[i])
      this.y2.push(+(this.y2[i-1]+((k1+k2)/2)).toFixed(2))
    }
    console.log(this.x2)
    console.log(this.y2)
    setTimeout(() =>{this.calculando2 = false;},1)
  }

}
