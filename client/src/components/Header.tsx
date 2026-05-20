import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import renalXLogo from "@assets/RenalX_1779276596000.jpg";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <img
            src={renalXLogo}
            alt="RenalX Logo"
            className="h-9 w-9 object-contain"
            data-testid="img-logo"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-primary" data-testid="text-app-title">
              RenalX
            </span>
            <span className="text-[10px] text-muted-foreground leading-none tracking-wide uppercase">
              Urinalysis
            </span>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDarkMode}
          data-testid="button-theme-toggle"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
