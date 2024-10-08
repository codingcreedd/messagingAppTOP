import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ContextProvider from './components/ContextProvider.jsx'
import Logs from './routes/Logs.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Friends from './routes/Friends.jsx'
import ChatRoom from './components/ChatRoom.jsx'
import ChatLayout from './routes/ChatLayout.jsx'
import EmptyChat from './components/EmptyChat.jsx'
import Profile from './routes/Profile.jsx'


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
            path: '',
            element: <EmptyChat />
          },
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
  },
  {
    path: '/:user_id/profile',
    element: <Profile />
  }
  
])

createRoot(document.getElementById('root')).render(
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>,
)
