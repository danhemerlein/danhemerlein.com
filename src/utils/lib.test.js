import { capitalizeFirstLetter, isEven } from './lib';

describe('test isEven', () => {
  it('should return true if the suplied argument is a number and evenly devisible by 2', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(1)).toBe(false);
    expect(isEven(NaN)).toBe(false);
    expect(isEven(undefined)).toBe(undefined);
    expect(isEven([])).toBe(undefined);
    expect(isEven({})).toBe(undefined);
    expect(isEven(false)).toBe(undefined);
    expect(isEven('')).toBe(undefined);
  });
});

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
