import { Component, OnInit } from '@angular/core';
import { evaluate, parse, compile } from 'mathjs';


@Component({
  selector: 'app-valor-inicial',
  templateUrl: './valor-inicial.component.html',
  styleUrls: ['./valor-inicial.component.scss']
})
export class ValorInicialComponent implements OnInit {
  n1: number = 10;
  n2: number = 10;
  n3: number = 10;
  x1: number[] = [0]
  y1: number[] = [-64]
  x2: number[] = []
  y2: number[] = []
  x3: number[] = []
  y3: number[] = []
  erro3: number[] = [0]
  xA: number[] = []
  yA: number[] = []
  calculando: boolean = true;
  calculando1: boolean = true;
  calculando2: boolean = true;
  calculando3: boolean = true;

  x0s = 0;
  y0s = -64;
  y1s: number[] = []
  x1s: number[] = []
  x2s: number[] = []
  y2s: number[] = []
  x3s: number[] = []
  y3s: number[] = []
  xAs: number[] = []
  yAs: number[] = []
  calculandoS: boolean = true;

  nS: number = 8;
  hS: number = 1;
  funcaoUsuario: string = '3*(x-4)^2';
  expr: any;
  selectedOption: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.analitico();
    this.recalcularEuler();
    this.calcularEulerMelhorado();
    this.calcularRungeKutta();
    this.salvar();
  }

  funcao(x: number) {
    return this.expr.evaluate({ x: x })
  }

  funcaoFixa(x: number) {
    return (x - 4) ** 3
  }

  derivadaFixa(x: number) {
    return 3 * (x - 4) ** 2
  }

  // f1(x:number){
  //   return x**2
  // }

  derivada(expr: any, x: number, h: number = 0.001): number {
    return (expr.evaluate({ x: x + h }) - expr.evaluate({ x: x })) / h;
  }

  analitico() {
    let h = 8 / 1000
    this.xA = []
    this.yA = [];
    for (let i = 0; i < 1000; i++) {
      this.xA.push(i * h);
      this.yA.push(this.funcaoFixa(this.xA[i]))
      //this.yA.push(this.f1(this.xA[i]))        
    }
  }

  selecionarExemplo(n: number) {
    this.selectedOption = +n;
    if (this.selectedOption == 1) {
      this.y1 = [-64]
    } else {
      this.y1 = [0]
    }
    this.recalcularEuler();
    this.calcularEulerMelhorado();
    this.calcularRungeKutta();
    this.analitico();
  }

  recalcularEuler() {
    this.calculando1 = true;
    let h = 8 / this.n1;
    this.x1 = [this.x1[0]]
    this.y1 = [this.funcaoFixa(this.x1[0])]
    for (let i = 1; i <= this.n1; i++) {
      this.x1.push(+(this.x1[0] + i * h).toFixed(2));
      this.y1.push(+(this.y1[i - 1] + h * this.derivadaFixa(this.x1[i - 1])).toFixed(2))
    }
    setTimeout(() => { this.calculando1 = false; }, 1)
  }

  calcularEulerMelhorado() {
    this.calculando2 = true;
    let h = 8 / this.n2;
    this.x2 = [this.x1[0]]
    this.y2 = [this.funcaoFixa(this.x1[0])]
    for (let i = 1; i <= this.n2; i++) {
      this.x2.push(+(this.x2[0] + i * h).toFixed(2));
      let k1 = 0;
      let k2 = 0;
      k1 = h * this.derivadaFixa(this.x2[i - 1]);
      k2 = h * this.derivadaFixa(this.x2[i]);
      this.y2.push(+(this.y2[i - 1] + ((k1 + k2) / 2)).toFixed(2))
    }
    setTimeout(() => { this.calculando2 = false; }, 1)
  }

  calcularRungeKutta() {
    this.calculando3 = true;
    let h = 8 / this.n3;
    this.x3 = [this.x1[0]]
    this.y3 = [this.funcaoFixa(this.x1[0])]
    this.erro3 = [0]
    for (let i = 1; i <= this.n3; i++) {
      this.x3.push(+(this.x3[0] + i * h).toFixed(2));
      let k1 = 0;
      let k2 = 0;
      let k3 = 0;
      let k4 = 0;
      k1 = h * this.derivadaFixa(this.x3[i - 1])
      k2 = h * this.derivadaFixa(this.x3[i - 1] + (h / 2))
      k3 = h * this.derivadaFixa(this.x3[i - 1] + (h / 2))
      k4 = h * this.derivadaFixa(this.x3[i])
      this.y3.push(+(this.y3[i - 1] + (k1 + 2 * k2 + 2 * k3 + k4) / 6).toFixed(2))
    }
    setTimeout(() => { this.calculando3 = false; }, 1)
    console.log(this.erro3);
  }

  recarregarGraficos() {
    this.calculando = true;
    setTimeout(() => {
      this.calculando = false;
    }, 1)

  }

  salvar(): void {
    try {
      this.expr = parse(this.funcaoUsuario).compile();

      this.calcularSimuladores();
      this.recarregarGraficos();
    } catch (error) {
      console.error('Error parsing expression:', error);
      alert('Invalid mathematical expression');
    }
  }

  calcularSimuladores() {
    this.calculandoS = true;
    let h = this.hS;
    //EULER
    this.x1s = [+this.x0s]
    this.y1s = [+this.y0s]
    for (let i = 1; i <= this.nS; i++) {
      this.x1s.push(+(this.x1s[0] + i * h).toFixed(2));
      this.y1s.push(+(this.y1s[i - 1] + h * this.funcao(this.x1s[i - 1])).toFixed(2))
    }

    //EULER MELHORADO
    this.x2s = [+this.x0s]
    this.y2s = [+this.y0s]
    for (let i = 1; i <= this.nS; i++) {
      this.x2s.push(+(this.x2s[0] + i * h).toFixed(2));
      let k1 = 0;
      let k2 = 0;
      k1 = h * this.funcao(this.x2s[i - 1]);
      k2 = h * this.funcao(this.x2s[i]);
      this.y2s.push(+(this.y2s[i - 1] + ((k1 + k2) / 2)).toFixed(2))
    }

    //RK4
    this.x3s = [+this.x0s]
    this.y3s = [+this.y0s]
    for (let i = 1; i <= this.nS; i++) {
      this.x3s.push(+(this.x3s[0] + i * h).toFixed(2));
      let k1 = 0;
      let k2 = 0;
      let k3 = 0;
      let k4 = 0;
      k1 = h * this.funcao(this.x3s[i - 1])
      k2 = h * this.funcao(this.x3s[i - 1] + (h / 2))
      k3 = h * this.funcao(this.x3s[i - 1] + (h / 2))
      k4 = h * this.funcao(this.x3s[i])
      this.y3s.push(+(this.y3s[i - 1] + (k1 + 2 * k2 + 2 * k3 + k4) / 6).toFixed(2))
    }

    setTimeout(() => { this.calculandoS = false; }, 1)
  }

}
