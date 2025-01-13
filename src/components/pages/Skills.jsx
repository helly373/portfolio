import React from "react";

const skills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "📜" },
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🌳" },
  { name: "Tailwind CSS", icon: "💨" },
  { name: "Git", icon: "🔧" },
  { name: "Docker", icon: "🐳" },
];

const Skills = () => {
  return (
    <div id="skills" className="min-h-screen bg-gradient-to-r from-[#1b4339] to-[#52b788] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          My Skills
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl">{skill.icon}</div>
              <h2 className="mt-4 text-lg font-semibold">{skill.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
