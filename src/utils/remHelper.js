import { SPACING } from './constants/spacing';

let values = SPACING;

const toRem = (value) => {
  return value / 10;
};

values = Object.values(values).reduce((acc, curr) => {
  return (acc[curr] = curr), acc;
}, values);

values.override = (value) => {
  return `${toRem(value)}rem`;
};

/*
Usage:
const StyledComponent = styled.div`
  margin-top: ${spacing[24]};
`;
OR
const StyledComponent = styled.div`
  margin-top: ${spacing.override(23)};
`;
*/

export const remHelper = new Proxy(values, {
  get: function Get(target, name) {
    const value = target[name];
    if (typeof value === 'function') {
      return value;
    }
    if (!value) {
      console.warn(`Using non-standard value (${name})`);
      return `${toRem(name)}rem`;
    }

    return `${toRem(value)}rem`;
  }
});
