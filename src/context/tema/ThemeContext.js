import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {
  const savedTheme = localStorage.getItem('_theme');
  const [theme, setTheme] = useState({
    theme: savedTheme ? savedTheme : "light",
    font: "Poppins",
    size: "14",
    statSize: "2",
    sizeSteps: {},
    animation: true,
    full_screen: false,
  });

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);