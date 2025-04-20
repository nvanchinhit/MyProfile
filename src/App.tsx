import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Me from './pages/Me';
import Projects from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="font-sans antialiased text-gray-800">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path='/contact' element={<Contact />}/>
          <Route path='/aboutme' element={<Me />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;