import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes-curvas',
  templateUrl: './ajustes-curvas.component.html',
  styleUrls: ['./ajustes-curvas.component.scss']
})
export class AjustesCurvasComponent implements OnInit {
  a1: number = 0;
  a2: number = 0;
  grau: number = 1;
  polinomioResultante: string = "";
  resultadoDesejado: number = 0;
  // pontos: number[][] = [[2013, 3569], [2014, 4437], [2015, 3830], [2016, 4055], [2017, 3773], [2018, 3721], [2019, 4355], [2020, 3368], [2021, 3380], [2022, 3480], [2023, 3861]];

  pontos: number[][] = [
    [1, 2],
    [2, 3],
    [3, 5],
    [4, 10],
    [5, 18],
    [6, 32],
    [7, 54],
    [8, 85]
  ];
  listaX: number[] = [];
  listaY: number[] = [];
  inicio = 0;
  fim = 10;
  valorDesejado: number = 0
  calculado: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if("pontosAC" in sessionStorage){
      this.pontos = JSON.parse(sessionStorage.getItem("pontosAC") ?? "");
    }

  }

  adicionarPonto() {
    let ponto = [this.a1, this.a2]
    this.pontos.push(ponto);
    this.a1 = 0;
    this.a2 = 0;
    sessionStorage.setItem('pontosAC',JSON.stringify(this.pontos))
  }

  plotar() {
    this.listaX = [];
    this.listaY = [];
    let h = (this.fim - this.inicio) / 100;
    for (let i = 0; i <= 100; i++) {
      this.listaX.push(this.inicio + i * h);
      this.listaY.push(this.leastSquares(this.pontos, this.grau, this.listaX[i]))
    }
    this.recarregarGrafico();
    this.resultadoDesejado = this.leastSquares(this.pontos, this.grau, this.valorDesejado);
  }

  onChangeValorDesejado() {
    this.resultadoDesejado = this.leastSquares(this.pontos, this.grau, this.valorDesejado);
  }

  recarregarGrafico() {
    this.calculado = false;
    setTimeout(() => {
      this.calculado = true;
    }, 1)

  }

  excluirPonto(i:any){
    this.pontos.splice(i,1);
    sessionStorage.setItem('pontosAC',JSON.stringify(this.pontos))
  }

  leastSquares(points: any, degree: any, x: any) {
    const n = points.length;
    const X = [];
    const Y = [];

    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j <= degree; j++) {
        row.push(Math.pow(points[i][0], j));
      }
      X.push(row);
      Y.push(points[i][1]);
    }

    // Transpose matrix X
    const XT = this.transpose(X);

    // Multiply XT with X
    const XTX = this.multiplyMatrices(XT, X);

    // Multiply XT with Y
    const XTY = this.multiplyMatrixVector(XT, Y);

    // Solve for the coefficients
    const coefficients = this.solveLinearSystem(XTX, XTY);

    // Build the polynomial string
    let polynomial = '';
    for (let i = 0; i <= degree; i++) {
      if (i > 0 && coefficients[i] >= 0) {
        polynomial += ' + ';
      }
      polynomial += `${coefficients[i].toFixed(4)}*x^${i}`;
    }

    this.polinomioResultante = polynomial;

    // Evaluate the polynomial at x
    let result = 0;
    for (let i = 0; i <= degree; i++) {
      result += coefficients[i] * Math.pow(x, i);
    }

    return result;
  }

  transpose(matrix: any) {
    return matrix[0].map((_: any, colIndex: any) => matrix.map((row: { [x: string]: any; }) => row[colIndex]));
  }

  multiplyMatrices(A: any, B: any) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
    const result = new Array(rowsA);

    for (let r = 0; r < rowsA; ++r) {
      result[r] = new Array(colsB).fill(0);
      for (let c = 0; c < colsB; ++c) {
        for (let i = 0; i < colsA; ++i) {
          result[r][c] += A[r][i] * B[i][c];
        }
      }
    }
    return result;
  }

  multiplyMatrixVector(matrix: any, vector: any) {
    const result = new Array(matrix.length).fill(0);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < vector.length; j++) {
        result[i] += matrix[i][j] * vector[j];
      }
    }
    return result;
  }

  solveLinearSystem(A: any, b: any) {
    // Use Gaussian elimination or other method to solve Ax = b
    const n = A.length;
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxEl = Math.abs(A[i][i]);
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > maxEl) {
          maxEl = Math.abs(A[k][i]);
          maxRow = k;
        }
      }

      // Swap rows
      [A[i], A[maxRow]] = [A[maxRow], A[i]];
      [b[i], b[maxRow]] = [b[maxRow], b[i]];

      // Eliminate column below pivot
      for (let k = i + 1; k < n; k++) {
        const c = -A[k][i] / A[i][i];
        for (let j = i; j < n; j++) {
          if (i === j) {
            A[k][j] = 0;
          } else {
            A[k][j] += c * A[i][j];
          }
        }
        b[k] += c * b[i];
      }
    }

    // Solve Ax = b for upper triangular matrix A
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = b[i] / A[i][i];
      for (let k = i - 1; k >= 0; k--) {
        b[k] -= A[k][i] * x[i];
      }
    }
    return x;
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
