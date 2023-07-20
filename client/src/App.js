import './App.css';
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/main' element={ <Homepage /> } exact/>
      </Routes>
    </>
  )
}

export default App;
