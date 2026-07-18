import { useState,useEffect, createContext,useContext } from 'react'
import { BrowserRouter,Navigate,Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'

//importing the elements 
import LogIn from './components/LogIn'
import LoginLayout from './layouts/LoginLayout'
import MainLayout from './layouts/MainLayout'
import Board from './pages/Board'
import Registro from './pages/Registo'
import CantidadRecolectada from './pages/CantidadRecolectada'
import Payment from './pages/Payment'
import Info from './pages/info'
import Copy from './pages/Copy'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<LoginLayout/>} >
            <Route path="/login" element={<LogIn/>} />
          </Route>

          <Route element={<MainLayout/>}>
              <Route path="/board" element={<Board/>} ></Route>
              <Route path="/registro" element={<Registro/>} ></Route>
              <Route path="/cafe" element={<CantidadRecolectada/>} ></Route>
              <Route path="/pay" element={<Payment/>} ></Route>
              <Route path="/info" element={<Info/>} ></Route>
              <Route path="/copy" element={<Copy/>} ></Route>
          </Route>
      </Routes>
      
    </>
  )
}

export default App
