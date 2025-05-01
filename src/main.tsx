import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import appRouter from './router/AppRouter.tsx'
import { AppContextProvider } from './core/context/AppContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={appRouter} />
    </AppContextProvider>
  </StrictMode>,
)
