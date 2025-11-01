export function Services() {
  return (
    <section className="py-32 px-8 bg-zinc-950 relative" id="services">
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
        <div className="text-sm text-gray-500 uppercase tracking-wider mb-12">Services</div>
        <h2 className="text-5xl md:text-6xl font-light mb-20">What I Do</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group p-12 border border-gray-800 bg-black/50 hover:border-green-500 transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-6 flex items-center justify-center text-black text-xl font-bold">
              W
            </div>
            <h3 className="text-2xl font-light mb-4">Web Design</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Creating beautiful, intuitive interfaces that provide exceptional user experiences across all devices and platforms.
            </p>
          </div>
          
          <div className="group p-12 border border-gray-800 bg-black/50 hover:border-green-500 transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-6 flex items-center justify-center text-black text-xl font-bold">
              D
            </div>
            <h3 className="text-2xl font-light mb-4">Development</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Building robust, scalable web applications using modern technologies and best practices for optimal performance.
            </p>
          </div>
          
          <div className="group p-12 border border-gray-800 bg-black/50 hover:border-green-500 transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-6 flex items-center justify-center text-black text-xl font-bold">
              M
            </div>
            <h3 className="text-2xl font-light mb-4">Mobile Apps</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Developing responsive mobile applications that work seamlessly across iOS and Android platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}