import React from "react";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with React and Tailwind CSS.",
    link: "https://github.com/yourusername/portfolio",
  },
  {
    title: "Grocery Management System",
    description:
      "A system to manage household groceries with smart suggestions and analytics.",
    link: "https://github.com/yourusername/grocery-management",
  },
  {
    title: "Weather App",
    description: "A simple app to fetch and display weather data using APIs.",
    link: "https://github.com/yourusername/weather-app",
  },
];

const Projects = () => {
  return (
    <div id="projects" className="min-h-screen bg-gradient-to-r from-[#1b4339] to-[#52b788] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          My Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-[#1b4339] text-white rounded-md hover:bg-[#52b788] transition-colors duration-300"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
