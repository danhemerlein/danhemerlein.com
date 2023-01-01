import general from './general';
import greyscale from './greyscale';
import yanBrand from './yanBrand';

const theme = {
  light: {
    background: general.white,
    foreground: general.black,
    figCaption: general.grey,
    anchor: general.black,
    border: general.black,
    general,
    yan: yanBrand,
    greyscale
  },
  dim: {
    background: general.grey,
    foreground: general.white,
    border: general.white,
    anchor: general.white,
    general,
    yan: yanBrand,
    greyscale
  },
  dark: {
    background: general.black,
    foreground: general.white,
    border: general.white,
    anchor: general.white,
    general,
    yan: yanBrand,
    greyscale
  },
  yan: {
    background: general.black,
    foreground: general.white,
    border: general.black,
    anchor: general.black,
    general,
    yan: yanBrand,
    greyscale
  }
};

export default theme;
