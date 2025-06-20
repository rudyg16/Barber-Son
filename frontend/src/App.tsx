import { Routes,Route } from "react-router";

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>} />
      <Route path='/quote' element={<Quote />} />

    </Routes>
  );
};

export default App
