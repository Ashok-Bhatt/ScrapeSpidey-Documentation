import { useTheme } from "../context/themeContext.jsx";
import { Sun, Moon } from "lucide-react";
import { themeColors } from "../constants/classes.js";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition bg-${themeColors["bg-secondary"]}`}
    >
      <span
        className={`absolute left-1 w-4 h-4 rounded-full shadow-md transform transition bg-${themeColors.bg} ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      />
      {theme === "light" ? (
        <Sun className={`absolute right-1 w-4 h-4 text-${themeColors.primary}`} />
      ) : (
        <Moon className={`absolute left-1 w-4 h-4 text-${themeColors.secondary}`} />
      )}
    </button>
  );
}

export default ThemeToggle;