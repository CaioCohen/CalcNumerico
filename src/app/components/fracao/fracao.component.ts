import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fracao',
  templateUrl: './fracao.component.html',
  styleUrls: ['./fracao.component.scss']
})
export class FracaoComponent implements OnInit {
  @Input() dividendo: string = "";
  @Input() divisor: string = "";
  exponentialDividendo = false;
  exponencialDividendo1:string = "";

  constructor() { }

  ngOnInit(): void {
    this.acharSupDividendo();
  }

  acharSupDividendo(){
    const startIndex = this.dividendo.indexOf('<sup>');
    const endIndex = this.dividendo.indexOf('</sup>');
    if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
      this.exponencialDividendo1 = this.dividendo.substring(startIndex + 5, endIndex);
      this.exponentialDividendo = true;
      this.dividendo = this.dividendo.substring(0,startIndex)
    }
  }

}
