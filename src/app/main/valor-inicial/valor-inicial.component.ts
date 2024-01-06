import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-valor-inicial',
  templateUrl: './valor-inicial.component.html',
  styleUrls: ['./valor-inicial.component.scss']
})
export class ValorInicialComponent implements OnInit {

  x:number[] = []
  y:number[] = []

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i <= 100; i++){
      this.x.push(i);
      this.y.push(this.funcao(i))
    }
  }

  funcao(x:number){
    return Math.sqrt(x)
  }

}
