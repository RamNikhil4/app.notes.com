import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Home, Bell, Archive, Trash2, Settings, Plus } from "lucide-react"
import { Link, useRouterState } from "@tanstack/react-router"
import { cn } from "@/lib/utils"

export function AppSidebarTrigger({ children }: { children?: React.ReactNode }) {
 return (
    <SheetTrigger asChild>
      {children || (
        <Button variant="ghost" size="icon" className="-ml-2 text-muted-foreground hover:text-foreground">
          <Menu className="w-6 h-6" />
        </Button>
      )}
    </SheetTrigger>
 )
}

export default function AppSidebar() {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const navItems = [
    { icon: Home, label: "Notes", path: "/" },
    { icon: Bell, label: "Reminders", path: "/reminders" },
    { icon: Plus, label: "Create New", path: "/new" }, // Placeholder
    { icon: Archive, label: "Archive", path: "/archive" },
    { icon: Trash2, label: "Trash", path: "/trash" },
  ]

  const bottomItems = [
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  return (
    <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 border-r-0 bg-background/95 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-secondary/10">
        <SheetHeader className="p-6 pb-2 text-left">
           <SheetTitle className="text-2xl font-serif font-medium flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
               <span className="font-bold text-lg">N</span>
            </span>
             Nodte
           </SheetTitle>
        </SheetHeader>
        
        <div className="px-4 py-6 space-y-8 flex-1 overflow-y-auto">
          <div className="space-y-1">
             <div className="px-2 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Menu</div>
            {navItems.map((item) => (
              <NavItem 
                key={item.path} 
                icon={item.icon} 
                label={item.label} 
                path={item.path} 
                isActive={currentPath === item.path} 
              />
            ))}
          </div>

          <div className="space-y-1">
             <div className="px-2 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Labels</div>
             {['Personal', 'Work', 'Ideas', 'Travel'].map(label => (
                <Button key={label} variant="ghost" className="w-full justify-start font-normal text-muted-foreground hover:text-foreground hover:bg-secondary/40 h-9">
                    <span className="w-2 h-2 rounded-full bg-slate-300 mr-3" />
                    {label}
                </Button>
             ))}
          </div>
        </div>

        <div className="p-4 border-t border-border/50 bg-secondary/5 space-y-1">
           {bottomItems.map((item) => (
              <NavItem 
                key={item.path} 
                icon={item.icon} 
                label={item.label} 
                path={item.path} 
                isActive={currentPath === item.path} 
              />
            ))}
        </div>
      </div>
    </SheetContent>
  )
}

function NavItem({ icon: Icon, label, path, isActive }: { icon: any, label: string, path: string, isActive: boolean }) {
  return (
    <Button
        variant="ghost"
        className={cn(
            "w-full justify-start text-base font-normal h-12 rounded-xl transition-all duration-200",
            isActive 
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/15 font-medium" 
                : "text-muted-foreground hover:text-foreground hover:translate-x-1"
        )}
        asChild
    >
      <Link to={path}>
        <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-indigo-600 dark:text-indigo-400" : "opacity-70")} />
        {label}
      </Link>
    </Button>
  )
}
