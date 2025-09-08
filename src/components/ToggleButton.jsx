import { useTheme } from "../context/themeContext.jsx";
import { Sun, Moon } from "lucide-react";
import { themeColors } from "../constants/classes.js";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-16 h-8 rounded-full transition border-1 border-gray-500 bg-gray-500`}
    >
      <span
        className={`absolute left-1 w-6 h-6 rounded-full shadow-md transform transition ${themeColors["bg"]} ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      />
      {theme === "light" ? (
        <Sun className={`absolute right-1 w-6 h-6 text-blue-200`} />
      ) : (
        <Moon className={`absolute left-1 w-6 h-6 text-blue-800`} />
      )}
    </button>
  );
}

export default ThemeToggle;