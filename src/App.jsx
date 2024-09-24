import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/'
import HomePage from './pages/HomePage/'
import AdminPage from './pages/AdminPage/'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/main' element={<HomePage/>}/>
      <Route path='/admin' element={<AdminPage/>}/>
    </Routes>
    </>
  )
}

export default App
