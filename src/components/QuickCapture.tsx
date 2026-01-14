import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CheckSquare, Image, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function QuickCapture() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const contentInputRef = useRef<HTMLTextAreaElement>(null)


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!title && !content) {
            setIsExpanded(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [title, content])

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setIsExpanded(false)
    setTitle('')
    setContent('')
  }
  
  const handleSave = () => {
      console.log("Saving note:", { title, content })
      handleClose()
  }

  return (
    <div className="max-w-2xl mx-auto mb-12 relative z-30 px-4" ref={containerRef}>
      <Card 
        className={cn(
            "rounded-xl shadow-paper border-border overflow-hidden transition-all duration-300 ease-in-out bg-background",
            isExpanded ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/10" : "hover:shadow-floating cursor-text"
        )}
        onClick={!isExpanded ? handleExpand : undefined}
      >
        <div className="flex flex-col">
            {isExpanded && (
                <div className="px-4 py-3 pb-0 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg font-medium border-none shadow-none px-0 focus-visible:ring-0 h-auto placeholder:text-muted-foreground/70"
                    />
                </div>
            )}
            
            <div className="p-2 flex items-start gap-2">
                <textarea
                    ref={contentInputRef}
                    placeholder={isExpanded ? "Type something..." : "Take a note..."}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        // Auto-grow
                        e.target.style.height = 'auto'; 
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onFocus={handleExpand}
                    className={cn(
                        "flex-1 bg-transparent border-none outline-none resize-none font-sans placeholder:text-muted-foreground text-foreground px-2 py-2.5",
                        isExpanded ? "min-h-[120px] text-base" : "h-12 overflow-hidden text-lg font-medium"
                    )}
                    style={{ height: isExpanded ? 'auto' : '48px' }}
                />
                
                {!isExpanded && (
                    <div className="flex gap-1 pr-2 pt-1 text-muted-foreground">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <CheckSquare className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                            <Image className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>

            {isExpanded && (
                <div className="flex items-center justify-between p-2 px-4 border-t border-border/40 bg-muted/5">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                            <Plus className="w-4 h-4" />
                        </Button>
                         <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                            <Image className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex gap-2">
                         <Button variant="ghost" size="sm" onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                            Close
                        </Button>
                        <Button size="sm" onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                            Save Note
                        </Button>
                    </div>
                </div>
            )}
        </div>
      </Card>
    </div>
  );
};
