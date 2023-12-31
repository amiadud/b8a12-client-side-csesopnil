import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider.jsx'
import Routes from './routes/Routes.jsx'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

  const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<QueryClientProvider client={queryClient}>
   <RouterProvider router = { Routes}>
    </RouterProvider>
    </QueryClientProvider>
</AuthProvider>
)
