import general from './general';
import yanBrand from './yanBrand';

const theme = {
  light: {
    background: general.white,
    foreground: general.black,
    figCaption: general.grey,
    anchor: general.black,
    border: general.black,
    general,
    yan: yanBrand
  },
  dim: {
    background: general.grey,
    foreground: general.white,
    border: general.white,
    anchor: general.white,
    general,
    yan: yanBrand
  },
  dark: {
    background: general.black,
    foreground: general.white,
    border: general.white,
    anchor: general.white,
    general,
    yan: yanBrand
  },
  yan: {
    background: general.black,
    foreground: general.white,
    border: general.black,
    anchor: general.black,
    general,
    yan: yanBrand
  }
};

export default theme;
