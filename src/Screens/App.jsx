import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./About";
import Contect from "./Contect";
import Features from "./Features";
import Index from "./Landing";
import Dashboard from './Dashboard';
import Generate from './Generate';
import Gallery from './Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/about"element={<About/>} />
        <Route path="/contact"element={<Contect/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/generate" element={<Generate/>} />
        <Route path='/gallery' element={<Gallery/>} />
        </Routes>
    </Router>
  );
}

export default App;
