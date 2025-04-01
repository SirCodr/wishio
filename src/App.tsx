import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/navigation/Layout'
import HomePage from './pages/Home'
import UserSettings from './pages/UserSettings'
import MyWishlists from './pages/my-wishlists/MyWishlists'
import WishesPage from './pages/my-wishlists/Wishes'
import SharedWishlistsPage from './pages/wishlists-shared-to-me/shared-wishlists'
import SignInPage from './pages/Sigin'
import AuthGuard from './guards/AuthGuard'
import SharedWishesPage from './pages/wishlists-shared-to-me/shared-wishes'
import InvitationPage from './pages/invitations/[id]'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route element={<AuthGuard />}>
          <Route path='/' element={<Layout />}>
            <Route index element={<Navigate to="/wishlists" />} />
            <Route path='dashboard' element={<HomePage />} />
            <Route path='wishlists' element={<MyWishlists />} />
            <Route path='wishlists/:id' element={<WishesPage />} />
            <Route path='invitations/:id' element={<InvitationPage />} />
            <Route path='shared' element={<SharedWishlistsPage />} />
            <Route path='shared/:id' element={<SharedWishesPage />} />
            <Route path='user' element={<UserSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
