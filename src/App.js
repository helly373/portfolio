import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Skills from './components/pages/Skills'
import Projects from './components/pages/Projects'
import Contacts from './components/pages/Contact'
import './components/styles/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      <Skills/>
      <Projects/>
      <Contacts/>
      {/* Other components will go here */}
    </div>
  );
}

export default App;
