import { useState } from "react";

interface CaseStudy {
  id: number;
  title: string;
  problem: string;
  approach: string;
  iterations: string[];
  impact: string;
  tech: string[];
  duration: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "E-commerce Performance Crisis",
    problem: "Client's online store had 8-second load times, causing 70% cart abandonment rate and $50K monthly revenue loss.",
    approach: "Conducted performance audit, identified bottlenecks: unoptimized images, blocking JavaScript, inefficient database queries.",
    iterations: [
      "Implemented lazy loading and WebP image conversion - reduced load time to 5s",
      "Code splitting and async loading - further reduced to 3s", 
      "Database query optimization and Redis caching - achieved 1.2s load time"
    ],
    impact: "Reduced load time by 85%, increased conversion rate by 45%, recovered $35K monthly revenue within 3 months.",
    tech: ["React", "Node.js", "Redis", "WebP", "Webpack"],
    duration: "6 weeks"
  },
  {
    id: 2,
    title: "Real-time Chat Scalability",
    problem: "Chat application crashed with 500+ concurrent users, messages delayed by 30+ seconds, users abandoning platform.",
    approach: "Analyzed WebSocket connections, identified memory leaks and inefficient message broadcasting causing server overload.",
    iterations: [
      "Implemented connection pooling - supported 800 users but still had delays",
      "Added message queuing with Redis - improved to 1,200 users",
      "Horizontal scaling with load balancer - achieved 5,000+ concurrent users"
    ],
    impact: "Scaled from 500 to 5,000+ users, reduced message latency to <100ms, increased user retention by 60%.",
    tech: ["Socket.io", "Redis", "Docker", "AWS", "Load Balancer"],
    duration: "4 weeks"
  },
  {
    id: 3,
    title: "Mobile App Battery Drain",
    problem: "React Native app drained 40% battery in 2 hours, causing negative reviews and user churn.",
    approach: "Profiled app performance, discovered excessive re-renders, background processes, and inefficient API calls.",
    iterations: [
      "Optimized component re-renders with React.memo - reduced battery usage by 15%",
      "Implemented background task management - additional 20% improvement",
      "API call batching and caching strategy - achieved 70% battery usage reduction"
    ],
    impact: "Reduced battery consumption by 70%, improved app store rating from 2.1 to 4.6 stars, increased DAU by 120%.",
    tech: ["React Native", "Redux", "AsyncStorage", "Flipper"],
    duration: "5 weeks"
  }
];

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);

  return (
    <section className="py-32 px-8 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Problem-Solving
            <span className="block text-emerald-400">Process</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            Beyond finished products - see how I think, analyze problems, iterate solutions, and deliver measurable impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className={`group p-8 bg-black/40 border rounded-2xl transition-all duration-300 cursor-pointer ${
                selectedCase === study.id
                  ? 'border-emerald-400/50 bg-emerald-950/10'
                  : 'border-gray-800 hover:border-emerald-400/30'
              }`}
              onClick={() => setSelectedCase(selectedCase === study.id ? null : study.id)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-xs text-emerald-400 font-medium">{study.duration}</span>
              </div>

              <h3 className="text-xl font-light text-white mb-4 group-hover:text-emerald-400 transition-colors">
                {study.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-2">Problem</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{study.problem}</p>
                </div>

                {selectedCase === study.id && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Approach</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{study.approach}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Iterations</h4>
                      <ul className="space-y-2">
                        {study.iterations.map((iteration, index) => (
                          <li key={index} className="text-sm text-gray-400 leading-relaxed flex items-start">
                            <span className="text-emerald-400 mr-2 mt-1">•</span>
                            {iteration}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Impact</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{study.impact}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-emerald-400 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs rounded border border-emerald-400/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center text-emerald-400 text-sm">
                <span>{selectedCase === study.id ? 'Click to collapse' : 'Click to expand'}</span>
                <svg 
                  className={`w-4 h-4 ml-2 transition-transform ${selectedCase === study.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}