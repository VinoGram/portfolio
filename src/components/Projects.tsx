import { useState } from "react";
import { motion } from "framer-motion";
import DecryptedText from "./DecryptedText";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);



  const projects = [
    {
      id: 1,
      title: "portfolio Website",
      description: "Responsive portfolio with animations",
      category: "Frontend",
      url: "https://patriciaghann.com",
      tech: ["React", "Node.js"]
    },
    {
      id: 2,
      title: "MotherHen",
      description: "Digital ToolKit",
      category: "FullStack",
      url: "https://motherhen-production.up.railway.app",
      tech: ["React", "python"]
    },
    {
      id: 3,
      title: "Efuoria",
      description: "Real-time Event platform with messaging",
      category: "Fullstack",
      url: "https://twitter.com",
      tech: ["React", "TypeScript", "Node.js"]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Responsive portfolio with animations",
      category: "Frontend",
      url: "https://gramtimevisuals.netlify.app",
      tech: ["React", "Tailwind", "Framer Motion"]
    },
    {
      id: 5,
      title: " Inventory System(Saas)",
      description: "Inventory System",
      category: "fullstack",
      url: "https://google.com",
      tech: ["Express.js", "React"]
    },
    {
      id: 6,
      title: " Echo App",
      description: "Better Conversation For Couples",
      category: "fullstack",
      url: "https://google.com",
      tech: ["Nest.js", "React"]
    },
  ];

  return (
    <section className="py-32 px-8 bg-zinc-950 relative" id="work">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-emerald-950/20 z-0"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div 
          className="text-center mb-20"
          animate={{ y: selectedProject ? -100 : 0, opacity: selectedProject ? 0.3 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-6xl md:text-7xl font-light text-white mb-6">
            <DecryptedText 
              text="My Work" 
              animateOn="view"
              speed={120}
              maxIterations={20}
              className="text-white"
            />
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-400 font-light max-w-2xl mx-auto"
          >
            Interactive showcase of my latest projects. Hover to explore, click to experience.
          </motion.p>
        </motion.div>

        {/* Live Preview Section */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mb-12 relative"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-white">Live Preview</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-emerald-400/10 text-emerald-400 rounded-lg hover:bg-emerald-400/20 transition-colors duration-300 border border-emerald-400/30"
              >
                Close
              </button>
            </div>
            <div className="relative w-full max-w-2xl mx-auto h-80 bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <iframe
                src={selectedProject}
                className="w-full h-full border-0"
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          animate={{ y: selectedProject ? 100 : 0, opacity: selectedProject ? 0.3 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: 5
              }}
              className="group relative p-8 bg-gradient-to-br from-black/40 via-black/30 to-emerald-950/20 border border-gray-800 rounded-2xl hover:border-emerald-400/50 transition-all duration-500 cursor-pointer overflow-hidden"
              onClick={() => setSelectedProject(project.url)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <motion.h3 
                      className="text-2xl font-light text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-emerald-400 text-sm font-light uppercase tracking-wider"
                      whileHover={{ x: 5 }}
                    >
                      {project.category}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-400/30 transition-all duration-300"
                    whileHover={{ rotate: 45, scale: 1.1 }}
                  >
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-gray-400 font-light mb-6 leading-relaxed"
                  whileHover={{ x: 5 }}
                >
                  {project.description}
                </motion.p>
                
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={tech} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-emerald-400/10 text-emerald-400 text-sm rounded-full border border-emerald-400/30 hover:bg-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-emerald-400/30 group-hover:border-emerald-400/70 transition-colors duration-300"></div>
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-emerald-400/30 group-hover:border-emerald-400/70 transition-colors duration-300"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-emerald-400/30 group-hover:border-emerald-400/70 transition-colors duration-300"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-emerald-400/30 group-hover:border-emerald-400/70 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}