import { describe, it } from 'vitest';
import validEmailFormat from './validEmailFormat';

describe('validEmailFormat', () => {
  it('should return true for valid email', () => {
    expect(validEmailFormat('test@email.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validEmailFormat('test@test')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validEmailFormat('')).toBe(false);
  });
});
