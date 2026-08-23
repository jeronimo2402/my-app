/**
 * Minimal, dependency-free evaluator for the arithmetic the calculator can produce.
 *
 * It replaces `expr-eval`, which has no patched release and allows prototype
 * pollution and arbitrary function calls through the expressions it evaluates
 * (GHSA-jc85-fpwf-qm7x, GHSA-vx3p-948g-6vhq).
 *
 * Only numbers, parentheses and + - * / are recognised; anything else throws,
 * so the caller's existing "Syntax Error" path handles it.
 */

type Token = { kind: 'number'; value: number } | { kind: 'op'; value: string };

const OPERATORS = '+-*/';

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (char === ' ') {
      i++;
    } else if (char >= '0' && char <= '9' || char === '.') {
      let literal = '';
      while (i < input.length && (input[i] >= '0' && input[i] <= '9' || input[i] === '.')) {
        literal += input[i++];
      }
      const value = Number(literal);
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid number: ${literal}`);
      }
      tokens.push({ kind: 'number', value });
    } else if (OPERATORS.includes(char) || char === '(' || char === ')') {
      tokens.push({ kind: 'op', value: char });
      i++;
    } else {
      throw new Error(`Unexpected character: ${char}`);
    }
  }

  return tokens;
}

/** Recursive-descent parser: expression -> term (('+' | '-') term)* */
function parse(tokens: Token[]): number {
  let position = 0;

  const peek = () => tokens[position];

  const expect = (value: string) => {
    const token = peek();
    if (!token || token.kind !== 'op' || token.value !== value) {
      throw new Error(`Expected '${value}'`);
    }
    position++;
  };

  const parseFactor = (): number => {
    const token = peek();
    if (!token) {
      throw new Error('Unexpected end of expression');
    }

    if (token.kind === 'number') {
      position++;
      return token.value;
    }

    if (token.value === '(') {
      position++;
      const value = parseExpression();
      expect(')');
      return value;
    }

    if (token.value === '-' || token.value === '+') {
      position++;
      const value = parseFactor();
      return token.value === '-' ? -value : value;
    }

    throw new Error(`Unexpected token: ${token.value}`);
  };

  const parseTerm = (): number => {
    let left = parseFactor();
    let token = peek();
    while (token && token.kind === 'op' && (token.value === '*' || token.value === '/')) {
      position++;
      const right = parseFactor();
      left = token.value === '*' ? left * right : left / right;
      token = peek();
    }
    return left;
  };

  const parseExpression = (): number => {
    let left = parseTerm();
    let token = peek();
    while (token && token.kind === 'op' && (token.value === '+' || token.value === '-')) {
      position++;
      const right = parseTerm();
      left = token.value === '+' ? left + right : left - right;
      token = peek();
    }
    return left;
  };

  const result = parseExpression();
  if (position !== tokens.length) {
    throw new Error('Trailing input');
  }
  return result;
}

export function evaluateExpression(expression: string): number {
  if (expression.length > 100) {
    throw new Error('Expression too long');
  }
  return parse(tokenize(expression));
}
