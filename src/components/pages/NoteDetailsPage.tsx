"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2 } from "lucide-react";
import { NoteEditor } from "../NoteEditor";
import { Button } from "../ui/Button";

interface NoteDetailsPageProps {
  noteId: string;
}

export function NoteDetailsPage({ noteId }: NoteDetailsPageProps) {
  // Mock data lookup (in real app, use loader)
  const isDemo = noteId === "1";
  const initialTitle = isDemo ? "Project Ideas 2024" : `Note ${noteId}`;
  const initialContent = isDemo
    ? "1. AI-powered recipe generator\n2. Local-first notes app with awesome UI\n3. Personal finance tracker with detailed charts..."
    : "This is a mock note content. Start typing to edit...";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button
            variant="ghost"
            className="gap-2 pl-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notes
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full w-10 h-10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 min-h-[60vh] relative overflow-hidden"
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <NoteEditor
          initialTitle={initialTitle}
          initialContent={initialContent}
        />
      </motion.div>
    </div>
  );
}
