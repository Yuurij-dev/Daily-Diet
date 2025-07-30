import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import SignInPage from './pages/SignIn'
import Home from './pages/Home'
import NewSnack from './pages/newSnack'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/newSnack' element={<NewSnack/>}/>
      </Routes>
    </Router>
  )
}

export default App