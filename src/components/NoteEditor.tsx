import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface NoteEditorProps {
  initialTitle?: string;
  initialContent?: string;
  readOnly?: boolean;
}

export function NoteEditor({
  initialTitle = "",
  initialContent = "",
  readOnly = false,
}: NoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [initialContent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <input
        type="text"
        placeholder="Note Title"
        defaultValue={initialTitle}
        readOnly={readOnly}
        className="w-full bg-transparent text-5xl font-bold tracking-tight border-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50 py-4"
      />

      <textarea
        ref={textareaRef}
        placeholder="Start writing..."
        defaultValue={initialContent}
        readOnly={readOnly}
        className="w-full bg-transparent text-lg leading-relaxed text-muted-foreground border-none focus:outline-none focus:ring-0 resize-none min-h-[50vh] placeholder:text-muted-foreground/50 mt-4"
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
      />
    </motion.div>
  );
}
