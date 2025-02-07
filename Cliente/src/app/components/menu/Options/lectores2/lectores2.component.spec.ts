import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lectores2Component } from './lectores2.component';

describe('Lectores2Component', () => {
  let component: Lectores2Component;
  let fixture: ComponentFixture<Lectores2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lectores2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lectores2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
