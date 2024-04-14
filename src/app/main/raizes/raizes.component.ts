import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raizes',
  templateUrl: './raizes.component.html',
  styleUrls: ['./raizes.component.scss']
})
export class RaizesComponent implements OnInit {

  simuladorEscolhido: number = 0;
  listaX: number[] = [];
  listaY: number[] = [];
  listaX2: number[] = [];
  listaY2: number[] = [];
  ponto1: number[] = [-6,-216]
  ponto2: number[] = [4,64]
  inicio = -8;
  fim = 8;
  contadorSecante = 0;

  constructor() { }

  ngOnInit(): void {
    this.recuperarCoordenadas();
  }

  escolher(n:number){
    this.simuladorEscolhido = n;
    if(n == 2){
      this.plotarRetaFalsaPosicao();
      this.recarregarGrafico();
    }else if (n == 3){
      this.ponto2  = [];
    }else if (n == 4){
      this.contadorSecante = 0;
      this.plotarRetaSecante();
      this.recarregarGrafico();
    }
    else{
      this.listaX2 = [];
      this.listaY2 = [];
      this.recarregarGrafico();
    }
  }

  funcao(x: number){
    return x**3
  }

  derivada(f: (x: number) => number, x: number, h: number = 0.001): number {
    return (f(x + h) - f(x)) / h;
  }

  recuperarCoordenadas(){
    let h = (this.fim - this.inicio)/1000;
    for(let i = 0; i < 1000; i++){
      this.listaX.push(this.inicio + i*h);
      this.listaY.push(this.funcao(this.listaX[i]))        
    }
  }

  metodoBissecao(){
    //se os sinais das extremidades são iguais
    if((this.ponto1[1] > 0 && this.ponto2[1] > 0) || (this.ponto1[1] < 0 && this.ponto2[1] < 0)){
      alert("Os pontos a e b devem ter sinais diferentes");
      return;
    }
    let medio = this.funcao((this.ponto1[0] + this.ponto2[0])/2);
    //se o ponto medio e o ponto 1 possuem o mesmo sinal
    if((medio < 0 && this.ponto1[1] < 0) || (medio > 0 && this.ponto1[1] > 0)){
      this.ponto1 = [(this.ponto1[0] + this.ponto2[0])/2,medio];
    }else{
      this.ponto2 = [(this.ponto1[0] + this.ponto2[0])/2,medio];
    }
    this.recarregarGrafico();
  }

  metodoFalsaPosicao(){
    //se os sinais das extremidades são iguais
    if((this.ponto1[1] > 0 && this.ponto2[1] > 0) || (this.ponto1[1] < 0 && this.ponto2[1] < 0)){
      alert("Os pontos a e b devem ter sinais diferentes");
      return;
    }
    let x0 = ((this.ponto1[0]*this.ponto2[1]) - (this.ponto2[0]*this.ponto1[1]))/(this.ponto2[1] - this.ponto1[1])
    // se X0 e o ponto 1 continuam com sinais diferentes
    if((this.funcao(x0) < 0 && this.ponto1[1] < 0) || (this.funcao(x0) > 0 && this.ponto1[1] > 0)){
      this.ponto1 = [x0,this.funcao(x0)];
    }else{
      this.ponto2 = [x0,this.funcao(x0)];
    }
    this.plotarRetaFalsaPosicao();
    this.recarregarGrafico();

  }

  metodoNewthon(){
    let xn = this.ponto1[0];
    
    xn = xn - (this.funcao(xn)/this.derivada(this.funcao,xn));

    this.ponto1 = [xn,this.funcao(xn)];
    this.recarregarGrafico();

  }

  metodoSecante(){

    let x0 = ((this.ponto1[0]*this.ponto2[1]) - (this.ponto2[0]*this.ponto1[1]))/(this.ponto2[1] - this.ponto1[1])
    if(this.contadorSecante % 2 == 0){
      this.ponto1 = [x0,this.funcao(x0)]
    }else{
      this.ponto2 = [x0,this.funcao(x0)]
    }
    this.contadorSecante++;
    this.plotarRetaSecante();
    this.recarregarGrafico();

  }

  plotarRetaFalsaPosicao(){
    this.listaX2 = [];
    this.listaY2 = [];
    let h = (this.ponto2[0] - this.ponto1[0])/1000;
      for(let i = 0; i < 1000; i++){
        let x = this.ponto1[0] + i*h;
        this.listaX2.push(x);
        let y = this.ponto1[1] + (x-this.ponto1[0])*((this.ponto2[1]-this.ponto1[1])/(this.ponto2[0]-this.ponto1[0]))
        this.listaY2.push(y)        
      }
  }

  plotarRetaSecante(){
    this.listaX2 = [];
    this.listaY2 = [];
    let h = (this.fim - this.inicio)/1000;
      for(let i = 0; i < 1000; i++){
        let x = this.ponto1[0] + i*h;
        this.listaX2.push(x);
        let y = this.ponto1[1] + (x-this.ponto1[0])*((this.ponto2[1]-this.ponto1[1])/(this.ponto2[0]-this.ponto1[0]))
        this.listaY2.push(y)        
      }
  }

  proximoPasso(){
    switch(this.simuladorEscolhido){
      case(1):
        this.metodoBissecao();
        break;
      case(2):
        this.metodoFalsaPosicao();
        break;
      case(3):
        this.metodoNewthon();
        break;
      case(4):
        this.metodoSecante();
        break;
      default:
        //do nothing
    }
  }

  recarregarGrafico(){
    let temp = this.simuladorEscolhido;
    this.simuladorEscolhido = 0;
    setTimeout(() =>{
      this.simuladorEscolhido = temp;
    },1)

  }

}
