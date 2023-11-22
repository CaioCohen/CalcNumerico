import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorInicialComponent } from './valor-inicial.component';

describe('ValorInicialComponent', () => {
  let component: ValorInicialComponent;
  let fixture: ComponentFixture<ValorInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
