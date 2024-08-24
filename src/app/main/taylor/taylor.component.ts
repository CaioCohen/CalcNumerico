import { Component, OnInit } from '@angular/core';
import { evaluate, parse, compile } from 'mathjs';

@Component({
  selector: 'app-taylor',
  templateUrl: './taylor.component.html',
  styleUrls: ['./taylor.component.scss']
})
export class TaylorComponent implements OnInit {

  constructor() { }

  funcaoUsuario: string = '(x-4)^3';
  grau: number = 1;
  ponto: number = 0;
  calculando: boolean = false;
  expr: any;
  x1: number[] = [];
  y1: number[] = [];
  x2: number[] = [];
  y2: number[] = [];


  funcao(x: number) {
    return this.expr.evaluate({ x: x })
  }

  derivative(f: (x: number) => number, x: number, h: number = 1e-6): number {
    return (f(x + h) - f(x - h)) / (2 * h);
  }

  salvar(): void {
    try {
      this.expr = parse(this.funcaoUsuario).compile();
      this.recarregarGrafico();
    } catch (error) {
      console.error('Error parsing expression:', error);
      alert('Expressão matemática inválida');
    }
  }

  recarregarGrafico() {
    this.calculando = true;
    setTimeout(() => {
      this.calculando = false;
    }, 1)

  }

  taylorPolynomial(x: number, n: number): number {
    let sum = 0;
    let factorial = 1;

    for (let i = 0; i <= n; i++) {
        // Calculate the ith derivative at point a
        let derivativeAtA = this.funcao;
        for (let j = 0; j < i; j++) {
            derivativeAtA = (x: number) => this.derivative(derivativeAtA, x);
        }

        // Calculate the ith term in the Taylor series
        const term = (derivativeAtA(this.ponto) / factorial) * Math.pow((x - this.ponto), i);
        sum += term;

        // Update factorial
        factorial *= (i + 1);
    }

    return sum;
}

  ngOnInit(): void {
  }

}
