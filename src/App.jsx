import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch(`${backendBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Falha no login')
      setMessage({ type: 'success', text: `Acesso concedido. Token: ${data.token}` })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white relative overflow-hidden">
      {/* Top bar */}
      <header className="w-full flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">BlueGuard</p>
            <p className="text-xs text-slate-300">Cybersecurity Access Portal</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <span className="hover:text-white transition-colors">About</span>
          <span className="hover:text-white transition-colors">Docs</span>
          <span className="hover:text-white transition-colors">Support</span>
        </div>
      </header>

      {/* Hero section with Spline */}
      <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-stretch px-6 md:px-10 pb-10">
        <div className="relative h-[320px] sm:h-[420px] md:h-[560px] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-b from-slate-900/40 to-slate-900/10">
          {/* 3D Scene */}
          <Spline scene="https://prod.spline.design/4HIlOdlXYYkZW66z/scene.splinecode" style={{ width: '100%', height: '100%' }} />

          {/* Subtle gradient overlay (non-blocking) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Login card */}
        <div className="relative z-10 flex items-center">
          <div className="w-full max-w-md mx-auto bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight">Acesso Seguro</h1>
                <p className="text-xs text-slate-300">Área restrita • Monitorado e protegido</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">E-mail corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@empresa.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-800/70 border border-white/10 outline-none text-sm placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-1">Senha</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Use uma senha forte (ex.: cyber@123)"
                    className="w-full pr-10 pl-3 py-2.5 rounded-lg bg-slate-800/70 border border-white/10 outline-none text-sm placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-500/30 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 select-none">
                  <input type="checkbox" className="accent-cyan-500/80 bg-slate-800 border-white/10 rounded" />
                  <span className="text-slate-300">Lembrar deste dispositivo</span>
                </label>
                <a className="text-cyan-400 hover:text-cyan-300" href="#">Esqueceu a senha?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60 font-semibold shadow-lg shadow-cyan-500/30 transition"
              >
                {loading ? 'Verificando…' : 'Entrar com proteção avançada'}
              </button>

              {message && (
                <div className={`text-sm mt-2 rounded-lg border px-3 py-2 ${message.type === 'success' ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10' : 'border-rose-500/40 text-rose-300 bg-rose-500/10'}`}>
                  {message.text}
                </div>
              )}

              <p className="text-[11px] text-slate-400 mt-2">
                Dica para demonstração: use uma senha contendo “cyber” (ex.: cyber@123).
              </p>
            </form>

            <div className="mt-6 text-[11px] text-slate-400">
              <p>Conexão ao servidor: <span className="text-slate-300">{backendBase}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative grid */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
    </div>
  )
}

export default App
