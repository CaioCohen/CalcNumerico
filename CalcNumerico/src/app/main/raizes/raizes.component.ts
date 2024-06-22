import { Component, OnInit } from '@angular/core';
import { evaluate, parse, compile } from 'mathjs';

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
  ponto1: number[] = [-6, -216]
  ponto2: number[] = [4, 64]
  inicio = -8;
  fim = 8;
  contadorSecante = 0;
  a1Usuario: number = 0;
  a2Usuario: number = 0;
  b1Usuario: number = 0;
  b2Usuario: number = 0;
  funcaoUsuario: string = 'x^3-30';
  result: number | null = null;
  expr: any;
  listaPassos: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.salvar();
  }

  escolher(n: number) {
    this.listaX2 = [];
    this.listaY2 = [];
    this.salvar();
    this.simuladorEscolhido = n;
      if (n == 2) {
        this.plotarRetaFalsaPosicao();
        this.recarregarGrafico();
      } else if (n == 3) {
        this.ponto2 = [];
        this.recarregarGrafico();
      } else if (n == 4) {
        this.contadorSecante = 0;
        this.plotarRetaSecante();
        this.recarregarGrafico();
      }
      else {
        this.recarregarGrafico();
      }
  }

  funcao(x: number) {
    return this.expr.evaluate({ x: x })
  }

  derivada(expr: any, x: number, h: number = 0.001): number {
    return (expr.evaluate({ x: x + h }) - expr.evaluate({ x: x })) / h;
  }

  recuperarCoordenadas() {
    this.listaX = [];
    this.listaY = [];
    let h = (this.fim - this.inicio) / 1000;
    for (let i = 0; i < 1000; i++) {
      this.listaX.push(this.inicio + i * h);
      this.listaY.push(this.funcao(this.listaX[i]))
    }
  }

  metodoBissecao() {
    //se os sinais das extremidades são iguais
    if ((this.ponto1[1] > 0 && this.ponto2[1] > 0) || (this.ponto1[1] < 0 && this.ponto2[1] < 0)) {
      alert("Os pontos a e b devem ter sinais diferentes");
      return;
    }
    let medio = this.funcao((this.ponto1[0] + this.ponto2[0]) / 2);
    //se o ponto medio e o ponto 1 possuem o mesmo sinal
    if ((medio < 0 && this.ponto1[1] < 0) || (medio > 0 && this.ponto1[1] > 0)) {
      this.ponto1 = [(this.ponto1[0] + this.ponto2[0]) / 2, medio];
    } else {
      this.ponto2 = [(this.ponto1[0] + this.ponto2[0]) / 2, medio];
    }
    this.listaPassos.push(`Ponto 1:(${this.ponto1[0].toFixed(2)},${this.ponto1[1].toFixed(2)}). Ponto 2: (${this.ponto2[0].toFixed(2)},${this.ponto2[1].toFixed(2)})` )
    this.recarregarGrafico();
  }

  metodoFalsaPosicao() {
    //se os sinais das extremidades são iguais
    if ((this.ponto1[1] > 0 && this.ponto2[1] > 0) || (this.ponto1[1] < 0 && this.ponto2[1] < 0)) {
      alert("Os pontos a e b devem ter sinais diferentes");
      return;
    }
    let x0 = ((this.ponto1[0] * this.ponto2[1]) - (this.ponto2[0] * this.ponto1[1])) / (this.ponto2[1] - this.ponto1[1])
    // se X0 e o ponto 1 continuam com sinais diferentes
    if ((this.funcao(x0) < 0 && this.ponto1[1] < 0) || (this.funcao(x0) > 0 && this.ponto1[1] > 0)) {
      this.ponto1 = [x0, this.funcao(x0)];
    } else {
      this.ponto2 = [x0, this.funcao(x0)];
    }
    this.listaPassos.push(`Ponto 1:(${this.ponto1[0].toFixed(2)},${this.ponto1[1].toFixed(2)}). Ponto 2: (${this.ponto2[0].toFixed(2)},${this.ponto2[1].toFixed(2)})` )
    this.plotarRetaFalsaPosicao();
    this.recarregarGrafico();

  }

  metodoNewthon() {
    let xn = this.ponto1[0];

    xn = xn - (this.funcao(xn) / this.derivada(this.expr, xn));

    this.ponto1 = [xn, this.funcao(xn)];
    this.listaPassos.push(`Ponto 1:(${this.ponto1[0].toFixed(2)},${this.ponto1[1].toFixed(2)}).` )
    this.recarregarGrafico();

  }

  metodoSecante() {

    let x0 = ((this.ponto1[0] * this.ponto2[1]) - (this.ponto2[0] * this.ponto1[1])) / (this.ponto2[1] - this.ponto1[1])
    if (this.contadorSecante % 2 == 0) {
      this.ponto1 = [x0, this.funcao(x0)]
    } else {
      this.ponto2 = [x0, this.funcao(x0)]
    }
    this.contadorSecante++;
    this.listaPassos.push(`Ponto 1:(${this.ponto1[0].toFixed(2)},${this.ponto1[1].toFixed(2)}). Ponto 2: (${this.ponto2[0].toFixed(2)},${this.ponto2[1].toFixed(2)})` )
    this.plotarRetaSecante();
    this.recarregarGrafico();

  }

  plotarRetaFalsaPosicao() {
    this.listaX2 = [];
    this.listaY2 = [];
    let h = (this.ponto2[0] - this.ponto1[0]) / 1000;
    for (let i = 0; i < 1000; i++) {
      let x = this.ponto1[0] + i * h;
      this.listaX2.push(x);
      let y = this.ponto1[1] + (x - this.ponto1[0]) * ((this.ponto2[1] - this.ponto1[1]) / (this.ponto2[0] - this.ponto1[0]))
      this.listaY2.push(y)
    }
  }

  plotarRetaSecante() {
    this.listaX2 = [];
    this.listaY2 = [];
    let h = (this.fim - this.inicio) / 1000;
    for (let i = 0; i < 1000; i++) {
      let x = this.inicio + i * h;
      this.listaX2.push(x);
      let y = this.ponto1[1] + (x - this.ponto1[0]) * ((this.ponto2[1] - this.ponto1[1]) / (this.ponto2[0] - this.ponto1[0]))
      this.listaY2.push(y)
    }

  }

  proximoPasso() {
    switch (this.simuladorEscolhido) {
      case (1):
        this.metodoBissecao();
        break;
      case (2):
        this.metodoFalsaPosicao();
        break;
      case (3):
        this.metodoNewthon();
        break;
      case (4):
        this.metodoSecante();
        break;
      default:
      //do nothing
    }
  }

  recarregarGrafico() {
    let temp = this.simuladorEscolhido;
    this.simuladorEscolhido = 0;
    setTimeout(() => {
      this.simuladorEscolhido = temp;
    }, 1)

  }


  salvar(): void {
    try {
      this.listaPassos = [];
      this.listaX2 = [];
      this.listaY2 = [];
      this.expr = parse(this.funcaoUsuario).compile();
      this.ponto1 = [this.a1Usuario, this.funcao(this.a1Usuario)];
      this.ponto2 = [this.b1Usuario, this.funcao(this.b1Usuario)];
      this.recuperarCoordenadas();
      this.simuladorEscolhido = 0;

    } catch (error) {
      console.error('Error parsing expression:', error);
      alert('Invalid mathematical expression');
    }
  }

  mudarEscala(positivo:number){
    if(positivo){
      this.inicio = this.inicio/2
      this.fim = this.fim/2
    }else{
      this.inicio = this.inicio*2
      this.fim = this.fim*2
    }
    this.recuperarCoordenadas();
    this.recarregarGrafico();
  }

}
