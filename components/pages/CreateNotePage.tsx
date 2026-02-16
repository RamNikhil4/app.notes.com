"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { NoteEditor } from "../NoteEditor";
import { Button } from "../ui/Button";

export function CreateNotePage() {
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
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Note
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 min-h-[60vh]"
      >
        <NoteEditor />
      </motion.div>
    </div>
  );
}
