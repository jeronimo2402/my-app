import { evaluateExpression } from './safe-expression';

describe('evaluateExpression', () => {
  it('evaluates the arithmetic the calculator can produce', () => {
    expect(evaluateExpression('2+3')).toBe(5);
    expect(evaluateExpression('12+34*2')).toBe(80);
    expect(evaluateExpression('7-2-3')).toBe(2);
    expect(evaluateExpression('10/4')).toBe(2.5);
    expect(evaluateExpression('(2+3)*4')).toBe(20);
    expect(evaluateExpression('-5+2')).toBe(-3);
  });

  it('rejects anything that is not arithmetic', () => {
    const hostile = [
      'constructor.constructor("return 1")()',
      '__proto__.polluted = 1',
      'x(1)',
      'a+1',
      '1;2',
    ];
    for (const expression of hostile) {
      expect(() => evaluateExpression(expression)).toThrow();
    }
    expect(({} as Record<string, unknown>)['polluted']).toBeUndefined();
  });

  it('rejects malformed expressions', () => {
    for (const expression of ['', '2+', '()', '1 2', '(1+2']) {
      expect(() => evaluateExpression(expression)).toThrow();
    }
  });
});
