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

  constructor() { }

  ngOnInit(): void {
    this.recuperarCoordenadas();
  }

  escolher(n:number){
    this.simuladorEscolhido = n;
    if(n == 2){
      this.plotarRetaFalsaPosicao();
      this.recarregarGrafico();
    }else{
      this.listaX2 = [];
      this.listaY2 = [];
      this.recarregarGrafico();
    }
  }

  funcao(x: number){
    return x**3
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

  proximoPasso(){
    switch(this.simuladorEscolhido){
      case(1):
        this.metodoBissecao();
        break;
      case(2):
        this.metodoFalsaPosicao();
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
