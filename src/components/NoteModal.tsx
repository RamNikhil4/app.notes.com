import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // Optional since we might render specific content
  note?: { title: string; content: string } | null;
}

export default function NoteModal({ isOpen, onClose, note }: NoteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-background border-border shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-4">
            <input
              type="text" 
              className="w-full text-3xl font-serif font-medium bg-transparent border-none p-0 focus:ring-0 text-foreground placeholder:text-muted-foreground outline-none" 
              placeholder="Title"
              defaultValue={note?.title} 
            />
            <textarea 
              className="w-full h-[60vh] bg-transparent border-none p-0 focus:ring-0 text-lg leading-relaxed text-foreground/90 resize-none font-sans outline-none"
              placeholder="Note content..."
              defaultValue={note?.content}
            />
        </div>
        
        <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
           <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
