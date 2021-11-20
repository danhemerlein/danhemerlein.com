import generalScheme from './general';
import yanBrand from './yanBrand';

const theme = {
  light: {
    background: '#FFFFFF',
    foreground: '#000000',
    anchor: '#000000',
    border: '#000000',
    general: generalScheme,
    yan: yanBrand,
  },
  dim: {
    background: '#3D3D3D',
    foreground: '#FFFFFF',
    border: '#FFFFFF',
    anchor: '#FFFFFF',
    general: generalScheme,
    yan: yanBrand,
  },
  dark: {
    background: '#000000',
    foreground: '#FFFFFF',
    border: '#FFFFFF',
    anchor: '#FFFFFF',
    general: generalScheme,
    yan: yanBrand,
  },
  yan: {
    background: '#C23B22',
    foreground: '#000000',
    border: '#000000',
    anchor: '#000000',
    general: generalScheme,
    yan: yanBrand,
  },
};

export default theme;
