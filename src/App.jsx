import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import './App.css'

import SearchWord from './componenti/SearchWord'
import Home from './componenti/Home'
import Pokemon from './componenti/Pokemon'
import Registrazione from './componenti/Registrazione'

function App() {
 

  return (
    <>
    <BrowserRouter>
  
  <Routes>
  <Route path='/' element={<Registrazione></Registrazione>}></Route>
    <Route path='/searchWord' element={<SearchWord></SearchWord>}></Route>
    <Route path='/pokemon' element={<Pokemon></Pokemon>}></Route>
    <Route path='/home' element={<Home></Home>}></Route>
  </Routes>
  
    
  </BrowserRouter>


    </>
 
  )
}

export default App
