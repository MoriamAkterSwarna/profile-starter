import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all hover-scale"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
    </button>
  );
};

export default DarkModeToggle;
