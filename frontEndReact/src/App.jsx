import { useState,useEffect, createContext,useContext } from 'react'
import { BrowserRouter,Navigate,useNavigate,Routes, Route, Link, useParams } from 'react-router-dom'
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
import ProtectedLayout from './components/ProtectedLayout'

function App() {
      const navigate = useNavigate();
      const [isAuthenticated, setIsAuthenticated] = useState(false)
      const [user, setUser] = useState(null)
      const [loginError, setLoginError] = useState("")

      console.log("isAuthenticated:", isAuthenticated);
      async function LogUser(user,password){

        console.log("login in ...", user, password)
        const respuesta = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user, pwd: password })
      })

      

      const resultado = await respuesta.json()
      console.log(resultado)

      if(resultado.success){
        console.log("inicia sesion ")
        setLoginError("")
        setIsAuthenticated(true)
        navigate("/board")
        
      }else{
        console.log(resultado.msg)
        setLoginError(resultado.msg)
      }

      }

      async function LogOutUser(){

        const respuesta = await fetch("http://localhost:3000/logout", {
          method: "POST"
        })

        const resultado = await respuesta.json()

        if(resultado.success){
          setIsAuthenticated(false)
          navigate(resultado.redirectUrl || "/login")
        }
      }

  return (
    <>
      
      <Routes>
          <Route path="/" element={ <Navigate to="/login" replace />} />
          <Route element={<LoginLayout/>} >
            <Route path="/login" element={<LogIn onLogin={LogUser} errorMsg={loginError} />} />
          </Route>

          <Route element={<ProtectedLayout isAuthenticated={isAuthenticated} onLogout={LogOutUser} />}>
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
