import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisLinComponent } from './sis-lin.component';

describe('SisLinComponent', () => {
  let component: SisLinComponent;
  let fixture: ComponentFixture<SisLinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SisLinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SisLinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
