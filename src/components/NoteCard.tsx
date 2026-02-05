import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  index: number;
  layoutId?: string;
  onClick?: () => void;
}

export function NoteCard({
  id,
  title,
  content,
  updatedAt,
  index,
  layoutId,
  onClick,
}: NoteCardProps) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        type: "spring",
        bounce: 0.3,
      }}
      whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }} // Reduced hover scale to prevent layout thrashing
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-card rounded-2xl shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-transparent transition-all duration-300 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] group-hover:border-primary/10 h-full overflow-hidden">
        <div className="relative p-7 flex flex-col h-auto min-h-[160px]">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </div>

          <p className="text-muted-foreground/80 leading-relaxed line-clamp-6 text-[15px] font-medium flex-1">
            {content}
          </p>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-transparent group-hover:border-border/30 transition-colors">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full group-hover:bg-primary/5 group-hover:text-primary transition-colors">
              <Clock className="w-3 h-3" />
              <span>{updatedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
