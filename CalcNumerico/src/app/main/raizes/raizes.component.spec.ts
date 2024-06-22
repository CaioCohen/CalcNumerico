import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaizesComponent } from './raizes.component';

describe('RaizesComponent', () => {
  let component: RaizesComponent;
  let fixture: ComponentFixture<RaizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaizesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
