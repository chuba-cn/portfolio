import { useState, useEffect } from "react";

export type Mode = "dark" | "light";

export const useThemeSwitcher = () => {
  const preferDarkQuery = "(prefers-color-scheme: dark)";

  const [mode, setMode] = useState<Mode | "">("");

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(preferDarkQuery);
    const userThemePreference = window.localStorage.getItem(
      "theme"
    ) as Mode | null;

    const handleChange = () => {
      if (userThemePreference) {
        const currentTheme: Mode =
          userThemePreference === "dark" ? "dark" : "light";

        setMode(currentTheme);

        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        const currentTheme: Mode = mediaQuery.matches ? "dark" : "light";

        setMode(currentTheme);

        if (currentTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {

    if (typeof window === "undefined") return;

    if (mode === "dark") {
      window.localStorage.setItem("theme", mode);
      document.documentElement.classList.add(mode);
    }

    if (mode === "light") {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return [mode, setMode];
};
