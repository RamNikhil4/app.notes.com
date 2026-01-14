import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login delay for effect
    setTimeout(() => {
      setLoading(false)
      navigate({ to: '/' })
    }, 800)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      
      <div className="w-full max-w-md relative z-10 perspective-1000">
        <div className="bg-background/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden group hover:shadow-primary/5 transition-all duration-500">
           {/* Glass effect shine */}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-6 mb-8">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-75 animate-pulse" />
              <div className="relative bg-background rounded-full p-4 ring-1 ring-white/10">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Welcome to Nodte
              </h1>
              <p className="text-muted-foreground text-sm">
                Capture your thoughts with elegance.
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2 group/input">
              <Input 
                type="email" 
                placeholder="Email address" 
                className="bg-secondary/30 border-transparent focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 h-12 transition-all duration-300"
                required
              />
            </div>
            <div className="space-y-2 group/input">
              <Input 
                type="password" 
                placeholder="Password" 
                className="bg-secondary/30 border-transparent focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 h-12 transition-all duration-300"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 group/btn mt-6"
              disabled={loading}
            >
              <span className="mr-2">{loading ? 'Entering...' : 'Enter App'}</span>
              {!loading && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/50">
              By continuing, you handle your own notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
