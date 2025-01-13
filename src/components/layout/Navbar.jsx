import React, { useState } from 'react';
import '../styles/index.css';

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navItems = ['home', 'skills', 'projects', 'contact'];

  return (
    <nav className="relative w-full top-0 bg-[#1b4339] shadow-md z-50 overflow-hidden">
      <div className="fog-effect"></div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="p-4 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">Logo</h1>
          </div>

          <div className="flex flex-row justify-center sm:justify-end border-t sm:border-t-0">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`px-4 py-3 text-sm font-medium capitalize flex-1 sm:flex-none transition-transform duration-300 hover:scale-110
                  ${
                    currentPage === item
                      ? "text-[#c8fad0] border-b-2 border-[#c8fad0] bg-[#52b788] sm:bg-transparent"
                      : "text-[#c8fad0]"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;