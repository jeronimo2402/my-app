import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SustentationComponent } from './sustentation.component';

describe('SustentationComponent', () => {
  let component: SustentationComponent;
  let fixture: ComponentFixture<SustentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SustentationComponent]
    });
    fixture = TestBed.createComponent(SustentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
