import React from "react";


const Home = () => {
  return (
    <div id="home" className="bg-gradient-to-r from-[#1b4339] to-[#52b788] min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Hi, I'm Helly Chauhan
        </h1>
        <p className="text-lg text-[#c8fad0] mb-6">
          Full-Stack Developer
        </p>
        <button className="px-6 py-3 bg-[#1b4339] text-white font-medium rounded-lg hover:bg-[#52b788] transition-colors duration-300">
          View My Work
        </button>
      </div>
    </div>
  );
};

export default Home;
