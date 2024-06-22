import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorContornoComponent } from './valor-contorno.component';

describe('ValorContornoComponent', () => {
  let component: ValorContornoComponent;
  let fixture: ComponentFixture<ValorContornoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorContornoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorContornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
