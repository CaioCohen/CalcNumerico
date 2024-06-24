import { Component, OnInit } from '@angular/core';
import { evaluate, parse, compile } from 'mathjs';

@Component({
  selector: 'app-integracao',
  templateUrl: './integracao.component.html',
  styleUrls: ['./integracao.component.scss']
})
export class IntegracaoComponent implements OnInit {

  constructor() { }

  funcaoUsuario: string = '(x-4)^3';
  a = 0;
  b = 10;
  numeroPassos = 6;
  expr: any;
  calculando: boolean = false;
  integralEscolhida: number = 0;
  x1: number[] = [];
  y1: number[] = [];
  x2: number[] = [];
  y2: number[] = [];
  resultado: number = 0;

  ngOnInit(): void {
    this.salvar();
    this.calcularAnalitico();
  }

  funcao(x: number) {
    return this.expr.evaluate({ x: x })
  }

  salvar(): void {
    try {
      this.expr = parse(this.funcaoUsuario).compile();
      this.calcularAnalitico();
      this.calcularIntegral();      
      this.recarregarGrafico();
    } catch (error) {
      console.error('Error parsing expression:', error);
      alert('Invalid mathematical expression');
    }
  }

  recarregarGrafico() {
    this.calculando = true;
    setTimeout(() => {
      this.calculando = false;
    }, 1)

  }

  calcularAnalitico() {
    this.x2 = [];
    this.y2 = [];
    let h = (this.b - this.a) / 1000;
    for (let i = 0; i < 1000; i++) {
      this.x2.push(this.a + (i * h))
      this.y2.push(this.funcao(this.x2[i]));
    }
  }

  calcularIntegral() {
    this.x1 = [];
    this.y1 = [];
    this.resultado = 0;
    let h = (this.b - this.a) / this.numeroPassos;
    switch (+this.integralEscolhida) {
      case (0):
        for (let i = 0; i <= this.numeroPassos; i++) {
          this.x1.push(this.a + (i * h))
          this.y1.push(this.funcao(this.x1[i]));
        }
        for (let i = 0; i < this.numeroPassos; i++) {
          const x0 = this.a + i * h;
          const x1 = this.a + (i + 1) * h;
          const y0 = this.funcao(x0);
          const y1 = this.funcao(x1);

          // Area of the trapezoid
          this.resultado += (y0 + y1) * h / 2;
        }
        break;
      case (1):
        if (this.numeroPassos % 2 !== 0) {
          throw new Error("O número de passos precisa ser par para a regra do 1/3 de simpson");
        }

        this.resultado = this.funcao(this.a) + this.funcao(this.b);

        for (let i = 1; i < this.numeroPassos; i++) {
          const x = this.a + i * h;
          this.resultado += (i % 2 === 0 ? 2 : 4) * this.funcao(x);
        }

        this.resultado *= h / 3;
        this.integrateSimpson();
        break;
    }
  }

  integrateSimpson() {

    const x: number[] = [];
    const y: number[] = [];
    const h = (this.b - this.a) / this.numeroPassos; 

    for (let i = 0; i < this.numeroPassos; i += 2) {
      const x0 = this.a + i * h;
      const x1 = x0 + h;
      const x2 = x0 + 2 * h;
      let espaco = x2-x0;
      let points = [[x0,this.funcao(x0)],[x1,this.funcao(x1)],[x2,this.funcao(x2)]]
      for (let j = 0; j <= 100; j++) { 
        const xVal = x0 + j * (espaco/100);
        const yVal = this.interpolateLagrange(points,xVal)
        x.push(xVal);
        y.push(yVal);
      }
    }

    this.x1 = x;
    this.y1 = y;
  }

  interpolateLagrange(points: number[][], x: number): number {
    const n = points.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
      let term = points[i][1];
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
        }
      }
      result += term;
    }

    return result;
  }

}
