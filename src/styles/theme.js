import generalScheme from './general';
import yanBrand from './yanBrand';

const theme = {
  light: {
    background: '#FFF',
    foreground: '#000',
    anchor: '#000',
    border: '#000',
    general: generalScheme,
    yan: yanBrand
  },
  dim: {
    background: '#3D3D3D',
    foreground: '#FFF',
    border: '#FFF',
    anchor: '#FFF',
    general: generalScheme,
    yan: yanBrand
  },
  dark: {
    background: '#000',
    foreground: '#FFF',
    border: '#FFF',
    anchor: '#FFF',
    general: generalScheme,
    yan: yanBrand
  },
  yan: {
    // background: '#C23B22',
    background: '#000',
    // foreground: '#000',
    foreground: '#FFF',
    border: '#000',
    anchor: '#000',
    general: generalScheme,
    yan: yanBrand
  }
};

export default theme;
