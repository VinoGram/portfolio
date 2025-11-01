import { useState, useEffect } from "react";

function SkillBar({ skill, categoryColor, delay }: { skill: { name: string; level: number }, categoryColor: string, delay: number }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentLevel(prev => {
          if (prev < skill.level) {
            return prev + 1;
          }
          clearInterval(interval);
          return skill.level;
        });
        setWidth(prev => {
          if (prev < skill.level) {
            return prev + 1;
          }
          return skill.level;
        });
      }, 20);
    }, delay);

    return () => clearTimeout(timer);
  }, [skill.level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill.name}</span>
        <span className="text-gray-400 text-sm">{currentLevel}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${categoryColor} transition-all duration-100 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      color: "from-cyan-400 to-blue-500",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Three.js", level: 75 },
      ],
    },
    {
      title: "Backend",
      color: "from-purple-400 to-pink-500",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 82 },
        { name: "GraphQL", level: 78 },
      ],
    },
    {
      title: "Tools & Cloud",
      color: "from-pink-400 to-red-500",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 95 },
        { name: "Vercel", level: 90 },
        { name: "Firebase", level: 82 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              <h3 className={`text-2xl font-bold mb-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar 
                    key={skill.name}
                    skill={skill}
                    categoryColor={category.color}
                    delay={categoryIndex * 300 + skillIndex * 150}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>, 
                title: "Fast Development", 
                desc: "Rapid prototyping",
                color: "text-yellow-400"
              },
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, 
                title: "Modern Design", 
                desc: "Clean & responsive",
                color: "text-purple-400"
              },
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, 
                title: "Secure Code", 
                desc: "Best practices",
                color: "text-green-400"
              },
              { 
                icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v1H7V4zm0 15V6h10v13H7z"/></svg>, 
                title: "Mobile First", 
                desc: "Cross-platform",
                color: "text-cyan-400"
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden cursor-pointer"
                style={{ 
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`
                }}
              >
                {/* Animated background blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-none transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12"></div>
                
                {/* Main card */}
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 text-center transition-all duration-700 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-cyan-500/10 group-hover:to-purple-500/10 group-hover:transform group-hover:scale-105 group-hover:-translate-y-4 group-hover:rotate-1">
                  
                  {/* Floating icon container */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className={`relative w-16 h-16 mx-auto ${feature.color} flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 group-hover:border-cyan-400/50 transition-all duration-500 group-hover:transform group-hover:scale-125 group-hover:rotate-12`}>
                      <div className="transform transition-all duration-700 group-hover:scale-110">
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Orbiting particles */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{animationDelay: '0s'}}></div>
                    <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{animationDelay: '0.2s'}}></div>
                    <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" style={{animationDelay: '0.4s'}}></div>
                  </div>
                  
                  {/* Animated text */}
                  <h4 className="text-xl font-bold text-white mb-3 transition-all duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:transform group-hover:scale-110">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 text-sm transition-all duration-500 group-hover:text-gray-200 group-hover:transform group-hover:scale-105">
                    {feature.desc}
                  </p>
                  
                  {/* Morphing border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
