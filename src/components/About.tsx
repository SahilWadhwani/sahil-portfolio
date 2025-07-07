import React from 'react';
import { Code, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
              <Code className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-gray-400">Passionate about writing maintainable, efficient, and scalable code</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security by Design</h3>
              <p className="text-gray-400">Building secure systems from the ground up with cybersecurity best practices</p>
            </div>
            
            <div className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Impact-Driven</h3>
              <p className="text-gray-400">Leveraging full-stack and cybersecurity skills to create meaningful solutions</p>
            </div>
          </div>
          
          <div className="text-lg text-gray-300 leading-relaxed space-y-4">
            <p>
              I’m a software engineer focused on cybersecurity and full-stack development, currently pursuing my MS in Computer Science at USC. I enjoy designing systems that are not just functional — but secure, thoughtful, and built to last.
            </p>
            <p>
              Strong believer in the power of clean code, security by design, and leveraging full-stack + 
              cyber skills to build impact-driven solutions that make a difference in the digital world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;