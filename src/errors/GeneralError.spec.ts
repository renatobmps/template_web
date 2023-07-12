import { describe, expect, it } from 'vitest';
import GeneralError from './GeneralError';

describe('GeneralError', () => {
  const error = new GeneralError('Some describe error');

  it('should be defined', () => {
    expect(error).toBeDefined();
  });

  it('should have a message', () => {
    expect(error.message).toBe('Some describe error');
  });

  it('should return default error message', () => {
    const newInstance = new GeneralError('');

    expect(newInstance.message).toBe('Unexpected error');
  });
});
