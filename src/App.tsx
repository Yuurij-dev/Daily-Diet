import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import SignInPage from './pages/SignIn'
import Home from './pages/Home'
import NewSnack from './pages/newSnack'
import OnDietPage from './pages/onDietPage'
import OutDietPage from './pages/outDietPage'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/newSnack' element={<NewSnack/>}/>
        <Route path='/congratulations' element={<OnDietPage/>}/>
        <Route path='/pity' element={<OutDietPage/>}/>
      </Routes>
    </Router>
  )
}

export default App