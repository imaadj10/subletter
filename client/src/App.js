import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Login /> } exact/>
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/home' element={ <Homepage /> } />
      </Routes>
    </>
  )
}

export default App;
