interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  return (
    <div className={`masonry-grid ${className}`}>
      {children}
    </div>
  );
};
