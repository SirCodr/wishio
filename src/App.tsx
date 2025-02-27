import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/navigation/Layout'
import Dashboard from './pages/Dashboard'
import UserSettings from './pages/UserSettings'
import MyWishlists from './pages/my-wishlists/MyWishlists'
import WishesPage from './pages/my-wishlists/Wishes'
import SharedWishlistsPage from './pages/wishlists-shared-to-me/shared-wishlists'
import SignInPage from './pages/Sigin'
import AuthGuard from './guards/AuthGuard'
import SharedWishesPage from './pages/wishlists-shared-to-me/shared-wishes'
import HomePage from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route element={<AuthGuard />}>
          <Route path='/' element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='wishlists' element={<MyWishlists />} />
            <Route path='wishlists/:id' element={<WishesPage />} />
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
