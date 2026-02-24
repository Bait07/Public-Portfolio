import { useTranslation } from "react-i18next";
import { Sun, Moon, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { topControlsStyles } from "./styles/TopControlsStyles";

const THEME_KEY = "theme";
const LANG_KEY = "lang";

function getPreferredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", theme);
}

export function TopControls() {
  const { t, i18n } = useTranslation("common");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const initial = getPreferredTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  const toggleLang = () => {
    const next = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  return (
    <div
      className={topControlsStyles.wrapper}
      role="group"
      aria-label="Top controls"
    >
      <button
        type="button"
        onClick={toggleTheme}
        className={topControlsStyles.button}
        aria-label={t("ui.theme")}
        title={t("ui.theme")}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
        ) : (
          <Moon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
        )}
      </button>

      <button
        type="button"
        onClick={toggleLang}
        className={topControlsStyles.button}
        aria-label={t("ui.language")}
        title={t("ui.language")}
      >
        <Languages className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
      </button>
    </div>
  );
}
