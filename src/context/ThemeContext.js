import { createContext, useContext } from 'react';

const ThemeContext = createContext({});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeContextProvider = ({ children, data }) => {
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};
