import { toBoolean } from '@/common/utils/primitives';
import { describe, expect, it } from 'bun:test';

describe('utils/primatives', () => {
  it('should convert string "true" to boolean true', () => {
    const result = toBoolean('true');
    expect(result).toBe(true);
  });

  it('should convert string "false" to boolean false', () => {
    const result = toBoolean('false');
    expect(result).toBe(false);
  });

  it('should handle empty string and return default value', () => {
    const result = toBoolean('');
    expect(result).toBe(false); // Default value is false
  });

  it('should handle undefined and return default value', () => {
    const result = toBoolean(undefined);
    expect(result).toBe(false); // Default value is false
  });

  it('should handle null and return default value', () => {
    const result = toBoolean(null);
    expect(result).toBe(false); // Default value is false
  });

  it('should handle boolean value and return the same value', () => {
    const result = toBoolean(true);
    expect(result).toBe(true);

    const result2 = toBoolean(false);
    expect(result2).toBe(false);
  });

  it('should handle non-string, non-boolean values and return default value', () => {
    const result = toBoolean(123);
    expect(result).toBe(false); // Default value is false
  });

  it('should handle string with spaces and return correct boolean value', () => {
    const result = toBoolean('  true  ');
    expect(result).toBe(true);
  });

  it('should handle case-insensitive comparison', () => {
    const result = toBoolean('TRUE');
    expect(result).toBe(true);
  });

  it('should handle default value when input is not a string or boolean', () => {
    const result = toBoolean({} as unknown);
    expect(result).toBe(false); // Default value is false
  });
});
