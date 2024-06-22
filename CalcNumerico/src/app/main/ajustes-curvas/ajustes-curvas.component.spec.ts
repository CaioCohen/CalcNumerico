import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesCurvasComponent } from './ajustes-curvas.component';

describe('AjustesCurvasComponent', () => {
  let component: AjustesCurvasComponent;
  let fixture: ComponentFixture<AjustesCurvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjustesCurvasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesCurvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
