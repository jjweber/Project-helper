import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuctWeightsComponent } from './duct-weights.component';

describe('DuctWeightsComponent', () => {
  let component: DuctWeightsComponent;
  let fixture: ComponentFixture<DuctWeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuctWeightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuctWeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
