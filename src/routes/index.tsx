import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Header from '../components/Header'
import QuickCapture from '../components/QuickCapture'
import MasonryGrid from '../components/MasonryGrid'
import NoteCard from '../components/ui/NoteCard'
import NoteModal from '../components/NoteModal'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<{title: string, content: string} | null>(null);

  const handleCardClick = (title: string, content: string) => {
    setSelectedNote({ title, content });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <QuickCapture />

        <MasonryGrid>
          <NoteCard 
            title="Project Phoenix Design" 
            preview='The core philosophy is subtraction. Remove everything that stands between the user and their thoughts. Focus on "Digital Paper" aesthetic.'
            date="Just now"
            onClick={() => handleCardClick("Project Phoenix Design", 'The core philosophy is subtraction...')}
          />
          
          <NoteCard 
            title="Inspiration Board" 
            onClick={() => handleCardClick("Inspiration Board", "Minimalism, Typography")}
          >
             <div className="h-32 bg-secondary w-full flex items-center justify-center text-muted-foreground rounded-md mb-3">
                 <span className="text-xs">Image Placeholder</span>
             </div>
             <div className="flex flex-wrap gap-2 text-xs">
                 <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground">Minimalism</span>
                 <span className="px-2 py-1 bg-secondary rounded text-secondary-foreground">Typography</span>
             </div>
          </NoteCard>

          <NoteCard 
            title="Grocery List" 
            onClick={() => handleCardClick("Grocery List", "- Almond Milk\n- Sourdough Bread\n- Espresso Beans")}
          >
            <ul className="space-y-2 text-sm text-foreground/80">
               <li className="flex items-center gap-2"><input type="checkbox" checked readOnly className="rounded border-border accent-primary" /> <span className="line-through text-muted-foreground">Almond Milk</span></li>
               <li className="flex items-center gap-2"><input type="checkbox" readOnly className="rounded border-border" /> <span>Sourdough Bread</span></li>
               <li className="flex items-center gap-2"><input type="checkbox" readOnly className="rounded border-border" /> <span>Espresso Beans</span></li>
            </ul>
          </NoteCard>

           <NoteCard className="bg-secondary/50 shadow-none border-transparent"
            title="Deep Work Summary"
            preview='"Who you are, what you think, feel, and do, what you love—is the sum of what you focus on."'
            onClick={() => handleCardClick("Deep Work Summary", "Full quote by Cal Newport...")}
           />

           <NoteCard 
            title="Q3 Goals" 
            preview="1. Launch Design System v2 \n 2. Clear Technical Debt \n 3. Hire Senior Frontend"
            onClick={() => handleCardClick("Q3 Goals", "Details on Q3 goals...")}
           />
        </MasonryGrid>
      </main>

      <NoteModal 
        isOpen={modalOpen} 
        onClose={handleCloseModal}
        note={selectedNote}
      />
      
      {/* Mobile FAB */}
      <Button className="fixed bottom-6 right-6 md:hidden h-14 w-14 rounded-2xl shadow-floating flex items-center justify-center z-50 hover:scale-105 transition-transform p-0 text-2xl">
        +
      </Button>
    </div>
  )
}
