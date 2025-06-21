import { Routes,Route } from "react-router-dom";

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'
import Services from './pages/Services'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>} />
      <Route path='/quote' element={<Quote />} />
      <Route path='/services' element={<Services />} />
    </Routes>
  );
};

export default App
