import { Routes,Route } from "react-router";

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Quote from './pages/Quote'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Quote' element={<Quote />} />

    </Routes>
  );
};

export default App
