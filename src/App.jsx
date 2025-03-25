import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import './App.css'

import SearchWord from './componenti/SearchWord'
import Home from './componenti/Home'

function App() {
 

  return (
    <>
    <BrowserRouter>
  
  <Routes>
  <Route path='/' element={<Home></Home>}></Route>
    <Route path='/searchWord' element={<SearchWord></SearchWord>}></Route>
  </Routes>
  
    
  </BrowserRouter>


    </>
 
  )
}

export default App
