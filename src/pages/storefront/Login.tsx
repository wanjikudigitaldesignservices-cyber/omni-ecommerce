import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SEO } from "@/components/storefront/SEO"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    setTimeout(() => {
      navigate('/account')
    }, 500)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-24">
      <SEO title={isLogin ? "Sign In | Omni" : "Create Account | Omni"} />
      
      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isLogin ? "Enter your credentials to access your account." : "Join Omni to track orders and save your preferences."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required placeholder="John Doe" className="bg-slate-900 border-slate-700 text-white" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required placeholder="john@example.com" className="bg-slate-900 border-slate-700 text-white" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <a href="#" className="text-xs text-primary-500 hover:text-primary-400">Forgot password?</a>
              )}
            </div>
            <Input id="password" type="password" required className="bg-slate-900 border-slate-700 text-white" />
          </div>

          <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-400 text-white">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-500 hover:text-primary-400 font-medium"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}
