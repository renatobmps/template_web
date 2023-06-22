import { describe, expect, it } from 'vitest';
import MakeLogin from './makeLogin';

describe('makeLogin', () => {
  it('should be defined', () => {
    expect(MakeLogin).toBeDefined();
  });

  it('should to be instantiated', () => {
    const makeLogin = new MakeLogin();

    expect(new MakeLogin()).toBeDefined();
    expect(makeLogin).toBeDefined();
    expect(makeLogin.execute).toBeDefined();
  });
});
