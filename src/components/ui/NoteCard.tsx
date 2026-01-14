import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React from 'react';

interface NoteCardProps {
  title?: string;
  preview?: string;
  date?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function NoteCard({ 
  title, 
  preview, 
  date, 
  onClick, 
  className = '',
  children
}: NoteCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "break-inside-avoid mb-6 cursor-pointer group transition-all duration-300",
        "shadow-paper hover:shadow-paper-hover hover:-translate-y-1",
        "bg-card border-border p-0", 
        className
      )}
    >
      <div className="p-5">
        {(title || preview) && (
          <div className="mb-2">
             {title && <h3 className="font-serif text-xl font-medium mb-2 text-foreground">{title}</h3>}
             {preview && <p className="text-muted-foreground text-sm leading-relaxed font-sans md:line-clamp-4">{preview}</p>}
          </div>
        )}

        {children}

        <div className="flex items-center justify-between mt-4 pt-2 border-t border-border/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-muted-foreground">{date || 'Just now'}</span>
        </div>
      </div>
    </Card>
  );
}
