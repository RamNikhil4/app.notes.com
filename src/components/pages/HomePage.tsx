import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, CheckSquare, Paintbrush, X, Save } from "lucide-react";
import { NoteCard } from "../NoteCard";
import { MasonryGrid } from "../MasonryGrid";
import { NoteEditor } from "../NoteEditor";
import { Button } from "../ui/Button";

const NOTES = [
  {
    id: "1",
    title: "Project Ideas 2024",
    content:
      "1. AI-powered recipe generator\n2. Local-first notes app with awesome UI\n3. Personal finance tracker with detailed charts...",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Meeting Notes: Design Sync",
    content:
      "Attendees: Sarah, Mike, Jessica. \n\nDiscussed the new design system. \n- Use Inter font family\n- Primary color: Indigo 600\n- Rounded corners: 12px\n\nNext steps: create Figma components.",
    updatedAt: "Yesterday",
  },
  {
    id: "3",
    title: "Grocery List",
    content:
      "- Milk\n- Eggs\n- Bread\n- Avocados\n- Coffee beans (Ethiopian)\n- Spinach",
    updatedAt: "2 days ago",
  },
  {
    id: "4",
    title: "Books to Read",
    content:
      "The Psychology of Money\nAtomic Habits\nClean Code\nPragmatic Programmer",
    updatedAt: "Last week",
  },
  {
    id: "5",
    title: "React Components to Build",
    content:
      "Date picker, Multi-select dropdown, Modal dialog, Toast notifications, Skeleton loader.",
    updatedAt: "Last week",
  },
  {
    id: "6",
    title: "Trip to Japan",
    content:
      "Itinerary draft:\nDay 1: Tokyo arrival\nDay 2: Shibuya & Harajuku\nDay 3: Kyoto generic sightseeing",
    updatedAt: "2 weeks ago",
  },
  {
    id: "7",
    title: "Workout Plan",
    content:
      "Monday: Chest & Triceps\nWednesday: Back & Biceps\nFriday: Legs & Shoulders",
    updatedAt: "3 weeks ago",
  },
];

export function HomePage() {
  const [selectedNote, setSelectedNote] = useState<(typeof NOTES)[0] | null>(
    null,
  );
  const [isCreating, setIsCreating] = useState(false);

  const handleClose = () => {
    setSelectedNote(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-10 relative min-h-[80vh]">
      {/* Quick Capture Input Trigger */}
      <div className="flex justify-center relative z-10">
        <motion.div
          layoutId="create-note-container"
          className="w-full max-w-2xl"
          onClick={() => setIsCreating(true)}
        >
          <div className="bg-card shadow-[0_2px_8px_rgb(0,0,0,0.08)] rounded-xl border border-border/40 p-4 flex items-center justify-between hover:shadow-[0_8px_16px_rgb(0,0,0,0.08)] transition-all duration-200 cursor-text">
            <span className="text-muted-foreground/70 font-medium text-lg ml-2">
              Take a note...
            </span>

            <div className="flex items-center gap-2 text-muted-foreground/60 mr-2">
              <div
                className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                title="New List"
              >
                <CheckSquare className="w-5 h-5" />
              </div>
              <div
                className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                title="New Drawing"
              >
                <Paintbrush className="w-5 h-5" />
              </div>
              <div
                className="p-2 hover:bg-secondary rounded-full transition-colors cursor-pointer"
                title="New Image"
              >
                <Image className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Masonry Grid */}
      <MasonryGrid>
        {NOTES.map((note, index) => (
          <NoteCard
            key={note.id}
            index={index}
            layoutId={`note-${note.id}`}
            onClick={() => setSelectedNote(note)}
            {...note}
          />
        ))}
      </MasonryGrid>

      {/* Modals */}
      <AnimatePresence>
        {(selectedNote || isCreating) && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[50]"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 flex items-center justify-center z-[51] pointer-events-none p-4">
              <motion.div
                layoutId={
                  selectedNote
                    ? `note-${selectedNote.id}`
                    : "create-note-container"
                }
                className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden pointer-events-auto flex flex-col max-h-[85vh]"
              >
                <div className="hidden">
                  {" "}
                  {/* Placeholder to prevent layout thrashing if needed, or remove */}{" "}
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide relative group/modal">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-foreground opacity-0 group-hover/modal:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  <NoteEditor
                    key={selectedNote?.id || "new"}
                    initialTitle={selectedNote?.title || ""}
                    initialContent={selectedNote?.content || ""}
                  />
                </div>

                <div className="p-3 border-t border-border/50 flex justify-between items-center bg-card/50 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Paintbrush className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={handleClose} size="sm" className="gap-2">
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
