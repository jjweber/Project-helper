import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeWeightsComponent } from './pipe-weights.component';

describe('PipeWeightsComponent', () => {
  let component: PipeWeightsComponent;
  let fixture: ComponentFixture<PipeWeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeWeightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeWeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
