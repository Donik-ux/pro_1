import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  UserPlus, 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Trash2,
  ShieldCheck
} from 'lucide-react'

function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState({ text: '', type: '' })
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const result = await response.json()
      if (result.success) {
        setUsers(result.data)
      }
    } catch (err) {
      console.error('Ошибка при загрузке:', err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        fetchUsers()
      }
    } catch (err) {
      console.error('Ошибка при удалении:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, age: Number(age) }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorText = Array.isArray(data.error) ? data.error.join(', ') : data.error
        setMessage({ text: errorText || 'Что-то пошло не так', type: 'error' })
      } else {
        setMessage({ text: 'Пользователь успешно создан!', type: 'success' })
        setName('')
        setPhone('')
        setEmail('')
        setAge('')
        fetchUsers()
      }
    } catch (err) {
      setMessage({ text: 'Ошибка соединения с сервером', type: 'error' })
    } finally {
      setIsLoading(false)
      // Clear message after 5 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    }
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-8 selection:bg-blue-500/30">
      {/* Background Decorations */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Side: Creation Form */}
        <div className="lg:col-span-5 space-y-6">
          <header className="mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-blue-400">User Management System</h2>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black tracking-tight"
            >
              Control Center<span className="text-blue-500">.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-slate-400 text-lg leading-relaxed max-w-md"
            >
              Добавляйте новых пользователей и управляйте базой данных в режиме реального времени.
            </motion.p>
          </header>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 rounded-[2rem] relative overflow-hidden group"
          >
            {/* Form Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-500"></div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div className="space-y-4">
                <div className="group/field">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1 transition-colors group-focus-within/field:text-blue-400">
                    <User className="w-3.5 h-3.5" /> Полное Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Александр Петров"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group/field">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1 transition-colors group-focus-within/field:text-blue-400">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@mail.com"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                      required
                    />
                  </div>
                  <div className="group/field">
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1 transition-colors group-focus-within/field:text-blue-400">
                      <Calendar className="w-3.5 h-3.5" /> Возраст
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="28"
                      min="10"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div className="group/field">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1 transition-colors group-focus-within/field:text-blue-400">
                    <Phone className="w-3.5 h-3.5" /> Телефон
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      maxLength={13}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono placeholder:text-slate-700"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${phone.length === 13 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-amber-500'}`}></div>
                      <span className="text-[10px] font-bold text-slate-600">{phone.length}/13</span>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full relative group/btn py-4.5 px-8 rounded-2xl font-black text-white transition-all overflow-hidden ${
                  isLoading 
                  ? 'bg-slate-800 cursor-not-allowed text-slate-600' 
                  : 'bg-blue-600 shadow-2xl shadow-blue-500/20'
                }`}
              >
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                )}
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>ОБРАБОТКА...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>ДОБАВИТЬ В СИСТЕМУ</span>
                    </>
                  )}
                </div>
              </motion.button>
            </form>

            <AnimatePresence>
              {message.text && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className={`relative overflow-hidden p-4 rounded-2xl flex items-start gap-3 border ${
                    message.type === 'error' 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}
                >
                  {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
                  <div className="text-sm font-semibold">{message.text}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Side: Users List */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <div className="glass-card flex-1 rounded-[2.5rem] overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/20 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black">База Данных</h2>
                  <p className="text-sm text-slate-500 font-medium">Активные профили в системе</p>
                </div>
              </div>
              <div className="bg-slate-900/80 px-5 py-2 rounded-2xl border border-slate-800 flex items-center gap-3">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Total</span>
                <span className="text-lg font-black text-blue-500">{users.length}</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {users.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-40">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
                    <Users className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-500">Система пуста</p>
                    <p className="text-sm text-slate-600">Ожидание первого подключения...</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {users.map((user, index) => (
                    <motion.div 
                      key={user._id || user.id} 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                      className="group relative p-5 bg-slate-900/40 rounded-3xl border border-slate-800/50 hover:bg-slate-800/40 hover:border-blue-500/30 transition-all hover:translate-x-1"
                    >
                      <div className="flex items-center gap-5">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-xl shadow-blue-500/10">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          {user.isActive && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold truncate text-slate-100 group-hover:text-blue-400 transition-colors">{user.name}</h3>
                            <span className="shrink-0 px-2 py-0.5 bg-slate-800 text-[10px] font-black tracking-widest text-slate-500 rounded-md border border-slate-700/50">
                              {user.age} YO
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                              <Mail className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[150px]">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-mono text-slate-500">
                              <Phone className="w-3.5 h-3.5" />
                              {user.phone}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-950 px-2 py-1 rounded-lg">
                            #{(user._id || user.id).toString().slice(-6)}
                          </span>
                          <button 
                            onClick={() => handleDelete(user._id || user.id)}
                            className="p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/10 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
            
            <div className="p-4 bg-slate-900/40 backdrop-blur-sm border-t border-slate-800/50 text-center">
              <p className="text-[10px] font-black tracking-[0.2em] text-slate-600 uppercase">
                End-to-end encrypted database connection active
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-6 py-2.5 rounded-full border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 border-r border-slate-800 pr-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Server Live</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em]">
          <span>React 19</span>
          <span className="opacity-30">•</span>
          <span>Vite 8</span>
          <span className="opacity-30">•</span>
          <span>Tailwind v4</span>
        </div>
      </footer>
    </div>
  )
}

export default App
