import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextProvider from './components/ContextProvider.jsx'
import Logs from './routes/Logs.jsx'
import Chats from './components/Chats.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Friends from './routes/Friends.jsx'
import ChatRoom from './components/ChatRoom.jsx'
import ChatLayout from './routes/ChatLayout.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>  
    ),
    children: [
      {
        path: '',
        element: <ChatLayout />
        ,children: [
          {
            path: '/:id/chat',
            element: <ChatRoom />
          }
        ]
      },
      {
        path: '/friends',
        element: <Friends />
      }
    ]
  },
  {
    path: '/logs/:logType',
    element: <Logs />
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
