import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./About";
import Contect from "./Contect";
import Features from "./Features";
import Dashboard from './Dashboard';
import Generate from './Generate';
import Gallery from './Gallery';
import ReGenerate from './Regenrate';
import SettingScreen from './setting';
import Landing from './Landing';

function Container() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Landing/>} />
        <Route path="/about"element={<About/>} />
        <Route path="/contact"element={<Contect/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/generate" element={<Generate/>} />
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/regenrate' element={<ReGenerate/>} />
        <Route path='/settings' element={<SettingScreen/>} />
        
        </Route>
    </Routes>
  );
}

export default Container;
