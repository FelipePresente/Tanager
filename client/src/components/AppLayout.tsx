import { Bird, CalendarDays, Compass, LogOut, MapPin, Newspaper, PlusCircle, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { useTanager } from '../hooks/useTanager'

const publicLinks = [
  { to: '/', label: 'Agenda', icon: CalendarDays, end: true },
  { to: '/explorar', label: 'Descobrir', icon: Compass },
  { to: '/mapa', label: 'Mapa', icon: MapPin },
  { to: '/meus-eventos', label: 'Meus eventos', icon: Sparkles },
  { to: '/noticias', label: 'Notícias', icon: Newspaper },
]

export function AppLayout() {
  const { user, signOut } = useTanager()
  const roleLink = user?.role === 'promoter'
    ? { to: '/promotor', label: 'Painel do promotor', icon: PlusCircle }
    : user?.role === 'admin'
      ? { to: '/admin', label: 'Moderação', icon: ShieldCheck }
      : null

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" to="/" aria-label="Tanager, ir para agenda">
            <span className="brand-mark"><Bird size={20} strokeWidth={2.4} /></span>
            <span>Tanager<span className="brand-period">.</span></span>
          </Link>
          <nav className="main-nav" aria-label="Navegação principal">
            {publicLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                <Icon size={16} />{label}
              </NavLink>
            ))}
            {roleLink && <NavLink to={roleLink.to} className={({ isActive }) => `nav-link role-link${isActive ? ' active' : ''}`}><roleLink.icon size={16} />{roleLink.label}</NavLink>}
          </nav>
          <div className="topbar-actions">
            {user ? (
              <>
                <Link className="account-chip" to="/conta"><span className="avatar"><UserRound size={15} /></span><span>{user.name.split(' ')[0]}</span></Link>
                <button className="icon-button signout-button" onClick={signOut} aria-label="Sair"><LogOut size={17} /></button>
              </>
            ) : <Link className="button button-light button-small" to="/entrar">Entrar</Link>}
          </div>
        </div>
      </header>
      <main className="page-wrap"><Outlet /></main>
      <footer className="footer">
        <div className="footer-inner">
          <Link className="footer-brand" to="/"><span className="brand-mark"><Bird size={18} /></span><span>Tanager</span></Link>
          <p>Uma cidade inteira para descobrir. <span>Caraguatatuba, SP</span></p>
          <div className="footer-links"><Link to="/noticias">Sobre o projeto</Link><Link to="/explorar">Acessibilidade</Link><span>© 2026 Tanager</span></div>
        </div>
      </footer>
    </div>
  )
}
