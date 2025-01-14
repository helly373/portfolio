import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper function to create hexagon points
const createHexagonPoints = (centerX, centerY, size) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
};

// Define skills with their connections and positions
const skillsData = {
  core: {
    id: 'webdev',
    name: 'Web Development',
    x: 400,
    y: 300,
    connections: ['frontend', 'backend', 'tools'],
    size: 45
  },
  skills: [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: '🎨',
      x: 250,
      y: 200,
      connections: ['html', 'css', 'js'],
      description: 'Building responsive and interactive user interfaces',
      size: 35
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '⚙️',
      x: 550,
      y: 200,
      connections: ['nodejs', 'db'],
      description: 'Server-side development and API integration',
      size: 35
    },
    {
      id: 'html',
      name: 'HTML5',
      icon: '🌐',
      x: 150,
      y: 100,
      level: 90,
      description: 'Semantic markup and accessibility',
      size: 30
    },
    {
      id: 'css',
      name: 'CSS3',
      icon: '🎨',
      x: 250,
      y: 100,
      level: 85,
      description: 'Styling and responsive design',
      size: 30
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: '📜',
      x: 350,
      y: 100,
      level: 88,
      description: 'Modern ES6+ and frameworks',
      size: 30
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: '🌳',
      x: 500,
      y: 100,
      level: 80,
      description: 'Server-side JavaScript',
      size: 30
    },
    {
      id: 'db',
      name: 'Databases',
      icon: '💾',
      x: 600,
      y: 100,
      level: 75,
      description: 'SQL and NoSQL databases',
      size: 30
    },
    {
      id: 'tools',
      name: 'DevTools',
      icon: '🔧',
      x: 400,
      y: 400,
      connections: ['git', 'docker'],
      description: 'Development and deployment tools',
      size: 35
    },
    {
      id: 'git',
      name: 'Git',
      icon: '📚',
      x: 350,
      y: 500,
      level: 88,
      description: 'Version control and collaboration',
      size: 30
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: '🐳',
      x: 450,
      y: 500,
      level: 75,
      description: 'Containerization and deployment',
      size: 30
    }
  ]
};

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  
  const drawConnections = () => {
    const connections = [];
    
    // Draw connections from core to main categories
    skillsData.core.connections.forEach(targetId => {
      const target = skillsData.skills.find(s => s.id === targetId);
      connections.push(
        <line
          key={`core-${targetId}`}
          x1={skillsData.core.x}
          y1={skillsData.core.y}
          x2={target.x}
          y2={target.y}
          stroke="#4a5568"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      );
    });
    
    // Draw connections between skills
    skillsData.skills.forEach(skill => {
      if (skill.connections) {
        skill.connections.forEach(targetId => {
          const target = skillsData.skills.find(s => s.id === targetId);
          connections.push(
            <line
              key={`${skill.id}-${targetId}`}
              x1={skill.x}
              y1={skill.y}
              x2={target.x}
              y2={target.y}
              stroke="#4a5568"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        });
      }
    });
    
    return connections;
  };

  return (
    <div id="skills" className="min-h-screen bg-gray-900 py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Skills Crystal Structure
        </motion.h1>

        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/10 p-4 rounded-lg text-white max-w-xs"
          >
            <h3 className="text-xl mb-2">
              {activeSkill.icon} {activeSkill.name}
              {activeSkill.level && (
                <span className="ml-2 text-sm text-white/80">
                  Level: {activeSkill.level}%
                </span>
              )}
            </h3>
            <p className="text-white/80">{activeSkill.description}</p>
          </motion.div>
        )}

        <svg width="800" height="600" className="mx-auto">
          {/* Draw connections */}
          {drawConnections()}
          
          {/* Draw core node */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <polygon
              points={createHexagonPoints(skillsData.core.x, skillsData.core.y, skillsData.core.size)}
              fill="#4299e1"
              className="cursor-pointer"
            />
            <text
              x={skillsData.core.x}
              y={skillsData.core.y}
              textAnchor="middle"
              dy=".3em"
              fill="white"
              fontSize="12"
            >
              {skillsData.core.name}
            </text>
          </motion.g>

          {/* Draw skill nodes */}
          {skillsData.skills.map((skill, index) => (
            <motion.g
              key={skill.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              className="cursor-pointer"
            >
              <polygon
                points={createHexagonPoints(skill.x, skill.y, skill.size)}
                fill={skill.level ? `hsl(200, 100%, ${skill.level}%)` : "#718096"}
                className="transition-all duration-300 hover:opacity-80"
                stroke="#ffffff33"
                strokeWidth="1"
              />
              <text
                x={skill.x}
                y={skill.y - 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                {skill.icon}
              </text>
              <text
                x={skill.x}
                y={skill.y + 15}
                textAnchor="middle"
                fill="white"
                fontSize="10"
              >
                {skill.name}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Skills;