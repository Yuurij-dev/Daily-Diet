import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import SignInPage from './pages/SignIn'
import Home from './pages/home'
import NewSnack from './pages/newSnack'
import OnDietPage from './pages/onDietPage'
import OutDietPage from './pages/outDietPage'
import StatsUser from './pages/statsUser'
import SnackPage from './pages/snackPage'
import EditSnack from './pages/editSnack'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        <Route path='/newSnack' element={<NewSnack/>}/>
        <Route path='/meal/edit/:id' element={<EditSnack/>}/>
        <Route path='/congratulations' element={<OnDietPage/>}/>
        <Route path='/pity' element={<OutDietPage/>}/>
        <Route path='/stats' element={<StatsUser/>}/>
        <Route path='/meal/:id' element={<SnackPage/>}/>
      </Routes>
    </Router>
  )
}

export default App