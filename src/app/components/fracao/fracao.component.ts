import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fracao',
  templateUrl: './fracao.component.html',
  styleUrls: ['./fracao.component.scss']
})
export class FracaoComponent implements OnInit {
  @Input() dividendo: string = "";
  @Input() divisor: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
