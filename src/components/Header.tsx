import { Moon, Search, Sun } from 'lucide-react';
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AppSidebar, { AppSidebarTrigger } from "./AppSidebar";
import { Input } from "@/components/ui/input";

export default function Header() {
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md z-40 border-b border-border flex items-center justify-between px-6 lg:px-8 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <Sheet>
            <AppSidebarTrigger />
            <AppSidebar />
        </Sheet>
        <h1 className="text-xl font-serif italic font-medium tracking-wide text-foreground">Keep Pro</h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-lg mx-6 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        </div>
        <Input 
          placeholder="Search your notes..." 
          className="pl-10 bg-secondary/50 focus-visible:bg-background border-transparent focus-visible:border-ring focus-visible:ring-0" 
        />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleDark} className="text-muted-foreground hover:text-foreground">
          <Moon className="h-5 w-5 hidden dark:block" />
          <Sun className="h-5 w-5 block dark:hidden" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-border flex items-center justify-center text-xs font-medium text-foreground">
          RN
        </div>
      </div>
    </header>
  );
};
