import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { BrowserRouter } from 'react-router'
import Router from './routes/Router.tsx'
import { MantineProvider } from '@mantine/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
