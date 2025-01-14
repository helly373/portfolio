import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Helper function to create hexagon points
const createHexagonPoints = (centerX, centerY, size) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = centerX + size * Math.cos(angle);
    const y = centerY + size * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
};

const getHexagonEdgePoint = (centerX, centerY, size, edge) => {
  const angleMap = {
    top: -Math.PI / 2, // Top point
    bottom: Math.PI / 2, // Bottom point
  };
  const angle = angleMap[edge];
  return {
    x: centerX + size * Math.cos(angle),
    y: centerY + size * Math.sin(angle),
  };
};


// Calculate positions in a hexagonal pattern
const calculatePosition = (centerX, centerY, index, totalItems, radius) => {
  const angle = (2 * Math.PI * index) / totalItems - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
};

// Updated skills data with hierarchical structure
const skillsData = {
  core: {
    id: 'skills',
    name: 'Skills',
    x: 600,
    y: 600,
    connections: ['frontend', 'backend', 'database', 'devops'],
    size: 100
  },
  categories: [
    {
      id: 'frontend',
      name: 'Frontend',
      size: 75,
      skills: [
        { id: 'react', name: 'React.js', level: 85 },
        { id: 'tailwind', name: 'Tailwind', level: 85},
        { id: 'bootstrap', name: 'Bootstrap', level: 80}
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      size: 75,
      skills: [
        { id: 'node', name: 'Node.js', level: 90 },
        { id: 'java', name: 'Java', level: 85 },
        { id: 'c#', name: 'C#', level: 88 }
      ]
    },
    {
      id: 'database',
      name: 'Database',
      size: 75,
      skills: [
        { id: 'mysql', name: 'MySQL', level: 90},
        { id: 'mongodb', name: 'MongoDB', level: 80},
        { id: 'postgresql', name: 'PostgreSQL', level: 85}
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      size: 75,
      skills: [
        { id: 'docker', name: 'Docker', level: 75},
        { id: 'azure', name: 'Azure', level: 70},
        { id: 'vercel', name: 'Vercel', level: 65}
      ]
    }
  ]
};

// Calculate positions for all elements
const processSkillsData = () => {
  // Set positions for categories in an "X" shape
  skillsData.categories = skillsData.categories.map((category, index) => {
    let pos;

    if (index === 0) {
      // Top-Left Quadrant
      pos = { x: skillsData.core.x - 300, y: skillsData.core.y - 300 };
    } else if (index === 1) {
      // Top-Right Quadrant
      pos = { x: skillsData.core.x + 300, y: skillsData.core.y - 300 };
    } else if (index === 2) {
      // Bottom-Left Quadrant
      pos = { x: skillsData.core.x - 300, y: skillsData.core.y + 300 };
    } else if (index === 3) {
      // Bottom-Right Quadrant
      pos = { x: skillsData.core.x + 300, y: skillsData.core.y + 300 };
    }

    return {
      ...category,
      x: pos.x,
      y: pos.y,
      skills: category.skills.map((skill, skillIndex) => {
        const skillPos = calculatePosition(
          pos.x,
          pos.y,
          skillIndex,
          category.skills.length,
          220
        ); // Radius for skills
        return {
          ...skill,
          x: skillPos.x,
          y: skillPos.y,
          size: 60,
        };
      }),
    };
  });

  return skillsData;
};


const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const processedData = processSkillsData();
  
  const drawConnections = () => {
    const connections = [];
  
    // Draw connections from core to categories
    processedData.categories.forEach((category) => {
      // Get edge points for core and category
      const coreTopPoint = getHexagonEdgePoint(
        processedData.core.x,
        processedData.core.y,
        processedData.core.size,
        'top'
      );
      const categoryBottomPoint = getHexagonEdgePoint(
        category.x,
        category.y,
        category.size,
        'bottom'
      );
  
      connections.push(
        <line
          key={`core-${category.id}`}
          x1={coreTopPoint.x}
          y1={coreTopPoint.y}
          x2={categoryBottomPoint.x}
          y2={categoryBottomPoint.y}
          stroke="#4a5568"
          strokeWidth="3"
          strokeDasharray="5,5"
        />
      );
  
      // Draw connections from categories to their skills
      category.skills.forEach((skill) => {
        const categoryTopPoint = getHexagonEdgePoint(
          category.x,
          category.y,
          category.size,
          'top'
        );
        const skillBottomPoint = getHexagonEdgePoint(
          skill.x,
          skill.y,
          skill.size,
          'bottom'
        );
  
        connections.push(
          <line
            key={`${category.id}-${skill.id}`}
            x1={categoryTopPoint.x}
            y1={categoryTopPoint.y}
            x2={skillBottomPoint.x}
            y2={skillBottomPoint.y}
            stroke="#4a5568"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        );
      });
    });
  
    return connections;
  };
  

  return (
    // <div id="skills" className="min-h-screen bg-gradient-to-r from-[#1b4339] to-[#52b788] py-12 px-4 relative overflow-hidden">
    <div id="skills" className="min-h-screen bg-white py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-white mb-12"
        >
          Skills
        </motion.h1>

        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/10 p-4 rounded-lg text-white max-w-xs"
          >
            <h3 className="text-xl mb-2">
              {activeSkill.name}
              {activeSkill.level && (
                <span className="ml-2 text-sm text-white/80">
                  Level: {activeSkill.level}%
                </span>
              )}
            </h3>
            <p className="text-white/80">{activeSkill.description}</p>
          </motion.div>
        )}

        <svg width="1200" height="1200" className="mx-auto">
          {drawConnections()}
          
          {/* Core Skills hexagon */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <polygon
              points={createHexagonPoints(processedData.core.x, processedData.core.y, processedData.core.size)}
              fill="white"
              stroke="black" // Add black border
              strokeWidth="2" // Adjust width for better visibility
              className="cursor-pointer"
            />
            <text
              x={processedData.core.x}
              y={processedData.core.y}
              textAnchor="middle"
              dy=".3em"
              fill="black"
              fontSize="16"
              fontWeight="bold"
            >
              {processedData.core.name}
            </text>
          </motion.g>

          {/* Category hexagons */}
          {processedData.categories.map((category, index) => (
            <motion.g key={category.id}>
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.5 }}
                onMouseEnter={() => setActiveSkill(category)}
                onMouseLeave={() => setActiveSkill(null)}
                className="cursor-pointer"
              >
                <polygon
                  points={createHexagonPoints(category.x, category.y, category.size)}
                  fill="white"
                  className="transition-all duration-300 hover:opacity-80"
                  stroke="black" // Add black border
                  strokeWidth="2" // Adjust width for better visibility
                  
                />
                <text
                  x={category.x}
                  y={category.y}
                  textAnchor="middle"
                  dy=".3em"
                  fill="black"
                  fontSize="14"
                >
                  {category.name}
                </text>
              </motion.g>

              {/* Skill hexagons */}
              {category.skills.map((skill, skillIndex) => (
                <motion.g
                  key={skill.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: (index * 0.1) + ((skillIndex + 1) * 0.1) }}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className="cursor-pointer"
                >
                  <polygon
                    points={createHexagonPoints(skill.x, skill.y, skill.size)}
                    fill="white"
                    className="transition-all duration-300 hover:opacity-80"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <text
                    x={skill.x}
                    y={skill.y}
                    textAnchor="middle"
                    dy=".3em"
                    fill="black"
                    fontSize="12"
                  >
                    {skill.name}
                  </text>
                </motion.g>
              ))}
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Skills;