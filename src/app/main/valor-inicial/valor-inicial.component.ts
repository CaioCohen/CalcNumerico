import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valor-inicial',
  templateUrl: './valor-inicial.component.html',
  styleUrls: ['./valor-inicial.component.scss']
})
export class ValorInicialComponent implements OnInit {
  n1: number = 10;
  n2: number = 10;
  n3:number = 10;
  x1:number[] = [0]
  y1:number[] = [-64]
  x2:number[] = []
  y2:number[] = []
  x3:number[] = []
  y3:number[] = []
  erro3:number[] = [0]
  xA:number[] = []
  yA:number[] = []
  calculando1:boolean = true;
  calculando2:boolean = true;
  calculando3:boolean = true;

  selectedOption: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  flinha1(x:number){
    return 3*((x-4)**2)
  }

  flinha2(x:number){
    return 2*x
  }

  f1(x:number){
    return (x-4)**3
  }

  f2(x:number){
    return x**2
  }

  analitico(){
    let h = 8/1000
    this.xA = []
    this.yA = [];
    for(let i = 0; i < 1000;i++){
      this.xA.push(i*h);
      if (this.selectedOption == 1){
        this.yA.push(this.f1(this.xA[i]))        
      }else{
        this.yA.push(this.f2(this.xA[i]))
      }
    }
  }

  selecionarExemplo(n: number){
    this.selectedOption = +n;
    if(this.selectedOption == 1){
      this.y1 = [-64]
    }else{
      this.y1 = [0]
    }
    this.recalcularEuler();
    this.calcularEulerMelhorado();
    this.calcularRungeKutta();
    this.analitico();
  }

  recalcularEuler(){
    this.calculando1 = true;
    let h = 8/this.n1;
    this.x1=[this.x1[0]]
    this.y1 = [this.y1[0]]
    for(let i = 1;i<this.n1;i++){
      this.x1.push(+(this.x1[0]+i*h).toFixed(2));
      if (this.selectedOption == 1){
        this.y1.push(+(this.y1[i-1]+h*this.flinha1(this.x1[i-1])).toFixed(2))
      }else{        
        this.y1.push(+(this.y1[i-1]+h*this.flinha2(this.x1[i-1])).toFixed(2))
      }
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
      let k1 = 0;
      let k2 = 0;
      if (this.selectedOption == 1){
        k1 = h*this.flinha1(this.x2[i-1])
        k2 = h*this.flinha1(this.x2[i])
      }else{
        k1 = h*this.flinha2(this.x2[i-1])
        k2 = h*this.flinha2(this.x2[i])
      }
      this.y2.push(+(this.y2[i-1]+((k1+k2)/2)).toFixed(2))
    }
    setTimeout(() =>{this.calculando2 = false;},1)
  }

  calcularRungeKutta(){
    this.calculando3 = true;
    let h = 8/this.n3;
    this.x3=[this.x1[0]]
    this.y3 = [this.y1[0]]
    this.erro3 = [0]
    for(let i = 1;i<this.n3;i++){
      this.x3.push(+(this.x3[0]+i*h).toFixed(2));
      let k1=0;
      let k2=0;
      let k3=0;
      let k4=0;
      if (this.selectedOption == 1){
        k1 = h*this.flinha1(this.x3[i-1])
        k2 = h*this.flinha1(this.x3[i-1]+(h/2))
        k3 = h*this.flinha1(this.x3[i-1]+(h/2))
        k4 = h*this.flinha1(this.x3[i])
      }else{
        k1 = h*this.flinha2(this.x3[i-1])
        k2 = h*this.flinha2(this.x3[i-1]+(h/2))
        k3 = h*this.flinha2(this.x3[i-1]+(h/2))
        k4 = h*this.flinha2(this.x3[i])
      }
      this.y3.push(+(this.y3[i-1]+(k1+2*k2+2*k3+k4)/6).toFixed(2))
      this.erro3.push(this.y3[i]-this.f1(this.x3[i]))
    }
    setTimeout(() =>{this.calculando3 = false;},1)
    console.log(this.erro3);
  }

}
