import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/portal/DashboardPage'
import { LanguageUpdatePage } from './pages/portal/LanguageUpdatePage'
import { PortalLayout } from './pages/portal/PortalLayout'
import { ReportsPage } from './pages/portal/ReportsPage'
import { getAuthSession } from './services/authStorage'
import { loginWithPassword, logout as logoutUser } from './services/authService'

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(getAuthSession()?.accessToken)
  })
  const navigate = useNavigate()

  const handleLogin = async (credentials) => {
    await loginWithPassword(credentials)
    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false)
    navigate('/login')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />

      <Route
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <PortalLayout onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/language-update"
          element={<LanguageUpdatePage />}
        />
        <Route
          path="/reports"
          element={<ReportsPage />}
        />
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

export default App
