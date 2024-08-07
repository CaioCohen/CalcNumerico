import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interpolacao',
  templateUrl: './interpolacao.component.html',
  styleUrls: ['./interpolacao.component.scss']
})
export class InterpolacaoComponent implements OnInit {

  constructor() { }
  a1: number = 0;
  a2: number = 0;
  formaInterpolacao: number = 2;
  valorDesejado:number = 0;
  polinomioInterpoladoNewton: string = "";
  polinomioInterpoladoLagrange: string = "";
  resultadoDesejado: number = 0;

  pontos: number[][] = [
    [1, 2],
    [2, 4],
    [4, 0],
    [5, -5],
    [6, 4],
    [7, 15],
    [8, 10]
  ];

  listaX: number[] = [];
  listaY: number[] = [];
  inicio = 0.5;
  fim = 8.5;
  calculado: boolean = false;
  ngOnInit(): void {
    if("pontosI" in sessionStorage){
      this.pontos = JSON.parse(sessionStorage.getItem("pontosI") ?? "");
    }
  }

  adicionarPonto() {
    let ponto = [this.a1, this.a2]
    this.pontos.push(ponto);
    this.a1 = 0;
    this.a2 = 0;
    sessionStorage.setItem('pontosI',JSON.stringify(this.pontos))

  }

  plotar() {
    this.listaX = [];
    this.listaY = [];
    let h = (this.fim - this.inicio) / 1000;
    for (let i = 0; i <= 1000; i++) {
      this.interpolateLagrange(this.pontos, this.listaX[i]);
      this.listaX.push(this.inicio + i * h);
      this.listaY.push(this.interpolateNewton(this.pontos, this.listaX[i]));
    }
    this.recarregarGrafico();
    this.resultadoDesejado = this.interpolateNewton(this.pontos, this.valorDesejado)
  }

  onValorDesejadoChange() {
    this.resultadoDesejado = this.interpolateNewton(this.pontos, this.valorDesejado)
  }

  interpolateLagrange(points: number[][], x: number): number {
    const n = points.length;
    let result = 0;
    let polynomial = '';

    for (let i = 0; i < n; i++) {
      let term = points[i][1];
      let termStr = points[i][1].toString();

      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
          termStr += ` * (x - ${points[j][0]}) / (${points[i][0]} - ${points[j][0]})`;
        }
      }
      result += term;

      if (i > 0) {
        polynomial += ' + ';
      }
      polynomial += `(${termStr})`;
    }

    this.polinomioInterpoladoLagrange = polynomial;
    return result;
  }

  interpolateNewton(points: number[][], x: number): number {
    const n = points.length;
    const dividedDifferences = this.computeDividedDifferences(points);
    let result = dividedDifferences[0][0];
    let term = 1;
    let polynomial = `${dividedDifferences[0][0]}`;

    for (let i = 1; i < n; i++) {
      term *= (x - points[i - 1][0]);
      result += dividedDifferences[0][i] * term;
      // Build the polynomial string
      let termStr = this.formatTerm(dividedDifferences[0][i], points, i);
      polynomial += ` ${termStr}`;
    }
    this.polinomioInterpoladoNewton = polynomial
    return result;
  }

  private computeDividedDifferences(points: number[][]): number[][] {
    const n = points.length;
    const dividedDifferences = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      dividedDifferences[i][0] = points[i][1];
    }

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        dividedDifferences[i][j] = (dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1]) / (points[i + j][0] - points[i][0]);
      }
    }

    return dividedDifferences;
  }

  private formatTerm(coefficient: number, points: number[][], index: number): string {
    let term = '';
    if (coefficient >= 0) {
        term += '+';
    }
    term += `${coefficient.toFixed(4)}`;
    
    for (let i = 0; i < index; i++) {
        term += `(x - ${points[i][0]})`;
    }

    return term;
  }

  recarregarGrafico() {
    this.calculado = false;
    setTimeout(() => {
      this.calculado = true;
    }, 1)
  }

  excluirPonto(i:any){
    this.pontos.splice(i,1);
    sessionStorage.setItem('pontosI',JSON.stringify(this.pontos))
  }

  mudarEscala(positivo: number) {
    let diferenca = Math.abs( this.fim - this.inicio)
    if (positivo) {
      this.inicio += diferenca/4
      this.fim -= diferenca/4
    } else {
      this.inicio -= diferenca/4
      this.fim += diferenca/4
    }
    this.plotar();
  }

}
