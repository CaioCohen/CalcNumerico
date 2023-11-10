import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaylorComponent } from './taylor.component';

describe('TaylorComponent', () => {
  let component: TaylorComponent;
  let fixture: ComponentFixture<TaylorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaylorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaylorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
