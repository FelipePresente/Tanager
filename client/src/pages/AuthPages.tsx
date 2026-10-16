import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Bird, Check, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useTanager } from '../hooks/useTanager'
import type { TanagerUser, UserRole } from '../types'

function AuthFrame({ children }: { children: React.ReactNode }) {
  return <main className="auth-frame"><Link to="/" className="auth-back"><ArrowLeft size={16} /> Voltar para a agenda</Link><div className="auth-card"><aside className="auth-intro"><Link className="brand auth-brand" to="/"><span className="brand-mark"><Bird size={20} /></span><span>Tanager<span className="brand-period">.</span></span></Link><div><span className="eyebrow eyebrow-light">Sua cidade, mais perto</span><h1>Viva Caraguá<br />por inteiro.</h1><p>Encontre eventos, conheça pessoas e guarde histórias que só acontecem aqui.</p></div><span className="auth-intro-foot">Uma agenda feita para todo mundo.</span></aside><section className="auth-form-area">{children}</section></div><p className="auth-footer">Tanager · Caraguatatuba, litoral norte de São Paulo</p></main>
}

function routeFor(role: UserRole) { return role === 'promoter' ? '/promotor' : role === 'admin' ? '/admin' : '/' }

export function LoginPage() {
  const { user, signIn } = useTanager()
  const navigate = useNavigate()
  const [role, setRole] = useState<Exclude<UserRole, 'visitor'>>('consumer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  if (user) return <Navigate to={routeFor(user.role)} replace />

  const enter = (selectedRole = role, enteredEmail = email) => {
    const names = { consumer: 'Ana Costa', promoter: 'Maré Produções', admin: 'Equipe Tanager' }
    const accounts = { consumer: 'ana@exemplo.com', promoter: 'promotor@exemplo.com', admin: 'admin@tanager.com' }
    const accountEmail = enteredEmail || accounts[selectedRole]
    let suspended: string[] = []
    try { suspended = JSON.parse(localStorage.getItem('tanager.admin.suspended.v1') ?? '[]') as string[] } catch { suspended = [] }
    if (suspended.includes(accountEmail)) { setError('Esta conta está suspensa temporariamente. Entre em contato com a equipe Tanager.'); return }
    const next: TanagerUser = { name: names[selectedRole], email: accountEmail, role: selectedRole }
    signIn(next)
    navigate(routeFor(selectedRole))
  }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (password.length < 4) { setError('Use uma senha com pelo menos 4 caracteres para continuar.'); return }
    setError('')
    enter(role, email)
  }

  return <AuthFrame><span className="eyebrow">Que bom ter você de volta</span><h2>Entre na sua conta</h2><p className="auth-lead">Acesse seus eventos e continue explorando a cidade.</p><form className="auth-form" onSubmit={submit}><label>Meu perfil<select value={role} onChange={(event) => setRole(event.target.value as Exclude<UserRole, 'visitor'>)}><option value="consumer">Público</option><option value="promoter">Promotor de eventos</option><option value="admin">Administrador</option></select></label><label>E-mail<span className="input-icon"><Mail size={16} /><input required type="email" placeholder="voce@email.com" value={email} onChange={(event) => setEmail(event.target.value)} /></span></label><label>Senha<span className="input-icon"><LockKeyhole size={16} /><input required type={showPassword ? 'text' : 'password'} placeholder="Sua senha" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary auth-submit">Entrar <ArrowRight size={16} /></button></form><div className="auth-divider"><span>ou experimente uma conta</span></div><div className="demo-buttons"><button onClick={() => enter('consumer')}><UserRound size={15} /> Público</button><button onClick={() => enter('promoter')}><Bird size={15} /> Promotor</button><button onClick={() => enter('admin')}><Check size={15} /> Admin</button></div><p className="auth-switch">Ainda não tem conta? <Link to="/cadastro">Criar conta</Link></p><p className="demo-disclaimer">Protótipo: as contas de demonstração não precisam de senha.</p></AuthFrame>
}

export function SignupPage() {
  const { user, signIn } = useTanager()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [role, setRole] = useState<'consumer' | 'promoter'>('consumer')
  const [error, setError] = useState('')
  if (user) return <Navigate to={routeFor(user.role)} replace />
  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (password.length < 6) { setError('A senha precisa ter pelo menos 6 caracteres.'); return }
    if (password !== confirm) { setError('As senhas não são iguais.'); return }
    signIn({ name, email, role })
    navigate(routeFor(role))
  }
  return <AuthFrame><span className="eyebrow">Comece agora</span><h2>Crie sua conta</h2><p className="auth-lead">Escolha como você quer fazer parte do Tanager.</p><form className="auth-form" onSubmit={submit}><label>Quero participar como<select value={role} onChange={(event) => setRole(event.target.value as 'consumer' | 'promoter')}><option value="consumer">Pessoa visitante</option><option value="promoter">Promotor de eventos</option></select></label><label>Nome completo<span className="input-icon"><UserRound size={16} /><input required autoComplete="name" placeholder="Como podemos chamar você?" value={name} onChange={(event) => setName(event.target.value)} /></span></label><label>E-mail<span className="input-icon"><Mail size={16} /><input required type="email" autoComplete="email" placeholder="voce@email.com" value={email} onChange={(event) => setEmail(event.target.value)} /></span></label><label>Senha<span className="input-icon"><LockKeyhole size={16} /><input required type="password" autoComplete="new-password" placeholder="Pelo menos 6 caracteres" value={password} onChange={(event) => setPassword(event.target.value)} /></span></label><label>Confirmar senha<span className="input-icon"><LockKeyhole size={16} /><input required type="password" autoComplete="new-password" placeholder="Digite sua senha novamente" value={confirm} onChange={(event) => setConfirm(event.target.value)} /></span></label>{error && <p className="form-error">{error}</p>}<button className="button button-primary auth-submit">Criar minha conta <ArrowRight size={16} /></button></form><p className="auth-switch">Já tem uma conta? <Link to="/entrar">Entrar</Link></p><p className="auth-privacy">Ao continuar, você concorda com os termos de uso e a política de privacidade.</p></AuthFrame>
}

export function AccountPage() {
  const { user, signIn } = useTanager()
  const [saved, setSaved] = useState(false)
  if (!user) return <Navigate to="/entrar" replace />
  return <div className="account-page"><span className="eyebrow">Seu perfil Tanager</span><h1>Olá, {user.name.split(' ')[0]}.</h1><p className="page-description">Mantenha suas informações atualizadas.</p><form className="account-form panel" onSubmit={(event) => { event.preventDefault(); signIn(user); setSaved(true); setTimeout(() => setSaved(false), 2000) }}><label>Nome<input value={user.name} onChange={(event) => signIn({ ...user, name: event.target.value })} /></label><label>E-mail<input type="email" value={user.email} onChange={(event) => signIn({ ...user, email: event.target.value })} /></label><label>Perfil<select value={user.role} onChange={(event) => signIn({ ...user, role: event.target.value as TanagerUser['role'] })}><option value="consumer">Público</option><option value="promoter">Promotor</option><option value="admin">Administrador</option></select></label><div className="account-form-bottom"><small>Suas preferências ficam salvas neste dispositivo.</small><button className="button button-primary">{saved ? <><Check size={16} /> Salvo</> : 'Salvar alterações'}</button></div></form></div>
}
