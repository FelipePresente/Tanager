import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { useTanager } from './hooks/useTanager'
import AdminPage from './pages/AdminPage'
import { AccountPage, LoginPage, SignupPage } from './pages/AuthPages'
import EventDetails from './pages/EventDetails'
import Explore from './pages/Explore'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import MyEvents from './pages/MyEvents'
import NewsPage from './pages/NewsPage'
import { NewEventPage } from './pages/PromoterPages'
import PromoterPages from './pages/PromoterPages'

function Guard({ role, children }: { role: 'promoter' | 'admin'; children: React.ReactNode }) {
  const { user } = useTanager()
  if (!user) return <Navigate to="/entrar" replace />
  if (user.role !== role && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

function NotFound() {
  return <section className="not-found panel"><span className="empty-icon">404</span><h1>Essa página saiu para passear.</h1><p>Mas ainda há muito para descobrir pela cidade.</p><a className="button button-primary" href="/">Ir para a agenda</a></section>
}

export default function App() {
  return <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="explorar" element={<Explore />} />
      <Route path="mapa" element={<MapPage />} />
      <Route path="meus-eventos" element={<MyEvents />} />
      <Route path="noticias" element={<NewsPage />} />
      <Route path="eventos/:id" element={<EventDetails />} />
      <Route path="conta" element={<AccountPage />} />
      <Route path="promotor" element={<Guard role="promoter"><PromoterPages /></Guard>} />
      <Route path="promotor/eventos/novo" element={<Guard role="promoter"><NewEventPage /></Guard>} />
      <Route path="promotor/eventos/:id" element={<Guard role="promoter"><PromoterPages analyticsOnly /></Guard>} />
      <Route path="admin" element={<Guard role="admin"><AdminPage /></Guard>} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="entrar" element={<LoginPage />} />
    <Route path="cadastro" element={<SignupPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
}
