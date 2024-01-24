import { Component, Input, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  canvas: any;
  contexto: any;
  @Input() x1: number[] = [];
  @Input() y1: number[] = [];

  @Input() x2: number[] = [];
  @Input() y2: number[] = [];
  configuracoes = {
    "padding": 30
  }
  constructor() {
  }
  // canvas de 640 x 360
  ngOnInit(): void {
    // configurando padding
    let labelsX = this.getLabelPositions(this.x1)
    let labelsY = this.getLabelPositions(this.y1)
    let tamanhos = labelsY.map(y =>{
      return y.toString().length;
    })
    let max = Math.max(...tamanhos);
    this.configuracoes.padding = Math.max(10*max)
    this.canvas = document.getElementById("espaco");
    this.contexto = this.canvas.getContext("2d");
    //Constroi os eixos
    this.contexto.strokeStyle = "black";
    this.contexto.lineWidth = 1;
    this.contexto.beginPath(); // Reset path for the axes
    //eixo x
    this.contexto.moveTo(this.LGX(this.x1[0]), this.LGY(0));
    this.contexto.lineTo(this.LGX(this.x1[this.x1.length-1]), this.LGY(0))
    this.contexto.stroke();
    this.contexto.font = "15px Arial";
    for(let i = 0; i < 5; i++){
      this.contexto.fillText(labelsX[i], this.LGX(labelsX[i]), this.LGY(labelsY[0])+20);
    }
    // eixo y
    this.contexto.moveTo(this.LGX(this.x1[0]), this.LGY(labelsY[0]));
    this.contexto.lineTo(this.LGX(this.x1[0]), this.LGY(labelsY[labelsY.length-1]))
    this.contexto.stroke();
    this.contexto.font = "15px Arial";
    for(let i = 0; i < 5; i++){
      this.contexto.fillText(labelsY[i], this.LGX(this.x1[0])-10*(labelsY[i].toString().length), this.LGY(labelsY[i]));
    }

    this.contexto.stroke();
    //Constroi o grafico
    this.contexto.strokeStyle = "blue";
    this.contexto.lineWidth = 2;
    this.contexto.beginPath(); // Reset path for the axes
    this.contexto.moveTo(this.LGX(this.x1[0]), this.LGY(this.y1[0]));
    for(let i = 1; i < this.x1.length; i++){
      let x = this.LGX(this.x1[i])
      let y = this.LGY(this.y1[i]);
      this.contexto.lineTo(x,y);
      this.contexto.stroke();
    }
    if(this.x2.length>0 && this.y2.length>0)
    this.contexto.stroke();
    //Constroi o grafico
    this.contexto.strokeStyle = "orange";
    this.contexto.lineWidth = 2;
    this.contexto.beginPath(); // Reset path for the axes
    this.contexto.moveTo(this.LGX(this.x2[0]), this.LGY(this.y2[0]));
    for(let i = 1; i < this.x2.length; i++){
      let x = this.LGX(this.x2[i])
      let y = this.LGY(this.y2[i]);
      this.contexto.lineTo(x,y);
      this.contexto.stroke();
    }
  }

  LGX(pos: number) {
    let first = this.x1[0];
    let last = this.x1[this.x1.length - 1];
    let espaco = last-first;
    let passo = (640-(2*(this.configuracoes.padding)))/espaco;
    return (passo*(pos-first))+this.configuracoes.padding;
  }

  LGY(pos: number) {
    let first = Math.min(...this.y1);
    let last = Math.max(...this.y1);
    if(first == last){
      first = first-first;
      last = last + last;
    }
    let espaco = last-first;
    let passo = (360-(2*(this.configuracoes.padding)))/espaco;
    return (360-(2*(this.configuracoes.padding)))-(passo*(pos-first))+this.configuracoes.padding;
  }

  getLabelPositions(array: number[]){
    let retorno = [0,0,0,0,0]
    retorno[0] = +Math.min(...array).toFixed(2)
    retorno[4] = +Math.max(...array).toFixed(2)
    if(retorno[0]==retorno[4]){
      retorno[0] -= retorno[0]
      retorno[4] += retorno[4]
    }
    retorno[2] =+((retorno[0]+retorno[4])/2).toFixed(2)
    retorno[1] = +((retorno[0]+retorno[2])/2).toFixed(2)
    retorno[3] = +((retorno[2]+retorno[4])/2).toFixed(2)
    return retorno;
  }

}
