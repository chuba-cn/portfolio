import { useState, useEffect } from 'react';

type Mode = "dark" | "light";

const useThemeSwitcher = () => {

  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [ mode, setMode ] = useState<Mode | "">("");

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userThemePreference = window.localStorage.getItem("theme") as Mode | null;

    const handleChange = () => {
      if (userThemePreference) {
        const currentTheme: Mode = userThemePreference === "dark" ? "dark" : "light";

        setMode(currentTheme);

        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark")
        }
      } else {
        const currentTheme: Mode = mediaQuery.matches ? 'dark' : "light";

        setMode(currentTheme);

        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
    
    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    }
  }, [])

  useEffect(() => {
    if (mode === "dark") {
      window.localStorage.setItem("theme", mode)
      document.documentElement.classList.add(mode)
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark")
    }
  }, [mode])
  

  return [ mode, setMode ]
  
}

export default useThemeSwitcher