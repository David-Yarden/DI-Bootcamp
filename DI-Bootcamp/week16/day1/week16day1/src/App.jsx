import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/product.jsx'
import {Routes, Route, Link} from "react-router"


function App() {
  return (
  <>
  <header>
    <nav style={{display: "flex", gap: "10px"}}  >
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/shop'}>Shop</Link>
    </nav>
  </header>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/shop' element={<Shop/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path="" element={<h1>404 Not Found</h1>}/>
      
    </Routes>
  </>
  )
}

export default App
