import { capitalizeFirstLetter } from './lib';

describe('test capitalizeFirstLetter', () => {
  it('should return a string with first letter capitalized and all other letters lowercase', () => {
    expect(capitalizeFirstLetter('month')).toBe('Month');
    expect(capitalizeFirstLetter('two words')).toBe('Two words');
    expect(capitalizeFirstLetter('sPoNgE bOb cAsE')).toBe('Sponge bob case');
    expect(capitalizeFirstLetter('')).toBe('');
    expect(capitalizeFirstLetter(NaN)).toBe(undefined);
    expect(capitalizeFirstLetter(0)).toBe(undefined);
    expect(capitalizeFirstLetter(1)).toBe(undefined);
    expect(capitalizeFirstLetter(undefined)).toBe(undefined);
    expect(capitalizeFirstLetter([])).toBe(undefined);
    expect(capitalizeFirstLetter({})).toBe(undefined);
    expect(capitalizeFirstLetter(false)).toBe(undefined);
  });
});
