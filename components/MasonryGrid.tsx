import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode[];
  columns?: number;
}

export function MasonryGrid({ children, columns = 3 }: MasonryGridProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {children.map((child, i) => (
        <div key={i} className="break-inside-avoid mb-6">
          {child}
        </div>
      ))}
    </div>
  );
}
