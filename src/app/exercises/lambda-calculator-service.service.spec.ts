import { TestBed } from '@angular/core/testing';

import { LambdaCalculatorServiceService } from './lambda-calculator-service.service';

describe('LambdaCalculatorServiceService', () => {
  let service: LambdaCalculatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LambdaCalculatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
