import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TanagerProvider } from './hooks/useTanager.tsx'
import './style.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento raiz "root" não foi encontrado no documento.')
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <TanagerProvider>
        <App />
      </TanagerProvider>
    </BrowserRouter>
  </StrictMode>
)
