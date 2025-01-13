import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import './components/styles/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home />
      {/* Other components will go here */}
    </div>
  );
}

export default App;
