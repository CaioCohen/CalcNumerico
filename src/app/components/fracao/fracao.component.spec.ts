import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FracaoComponent } from './fracao.component';

describe('FracaoComponent', () => {
  let component: FracaoComponent;
  let fixture: ComponentFixture<FracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FracaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
