import { describe, expect, it } from 'vitest';
import stringFormatToSlug from './stringFormatToSlug';

describe('stringFormatToSlug', () => {
  it('should be defined', () => {
    expect(stringFormatToSlug).toBeDefined();
  });

  it('should return a slug', () => {
    expect(stringFormatToSlug('Test')).toBe('test');
    expect(stringFormatToSlug('Test string')).toBe('test_string');
    expect(stringFormatToSlug('Test with  two spaces')).toBe(
      'test_with_two_spaces',
    );
    expect(
      stringFormatToSlug(
        'Test with  two spaces and special chars !@#$%^&*()_+-=[]{}',
      ),
    ).toBe('test_with_two_spaces_and_special_chars');
    expect(stringFormatToSlug('Renato Brandão')).toBe('renato_brandao');
    expect(stringFormatToSlug('my_username_123')).toBe('my_username_123');
  });

  it('should return a slug with a custom separator', () => {
    expect(stringFormatToSlug('Another way to do', '-')).toBe(
      'another-way-to-do',
    );
  });
});
