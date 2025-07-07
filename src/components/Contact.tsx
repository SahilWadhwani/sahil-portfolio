// import React, { useState } from 'react';
// import { Mail, Send, CheckCircle } from 'lucide-react';
// import ScrollReveal from './ScrollReveal';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     setFormData({ name: '', email: '', message: '' });
    
//     // Reset success message after 3 seconds
//     setTimeout(() => setIsSubmitted(false), 3000);
//   };

//   return (
//     <section id="contact" className="py-20">
//       <div className="container mx-auto px-6">
//         <ScrollReveal direction="up">
//           <div className="text-center mb-16">
//             <div className="flex items-center justify-center mb-4">
//               <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg mr-4">
//                 <Mail className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-4xl lg:text-5xl font-bold">
//                 Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
//               </h2>
//             </div>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//               Let's discuss opportunities, collaborations, or just connect!
//             </p>
//           </div>
//         </ScrollReveal>

//         <ScrollReveal direction="up" delay={200}>
//           <div className="max-w-2xl mx-auto">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     placeholder="Your Name"
//                     className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="your.email@example.com"
//                     className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-300">
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={6}
//                   placeholder="Your message..."
//                   className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || isSubmitted}
//                 className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
//                   isSubmitted
//                     ? 'bg-green-600 text-white'
//                     : isSubmitting
//                     ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 btn-glow'
//                 }`}
//               >
//                 {isSubmitted ? (
//                   <>
//                     <CheckCircle className="w-5 h-5 mr-2" />
//                     Message Sent!
//                   </>
//                 ) : isSubmitting ? (
//                   <>
//                     <div className="w-5 h-5 mr-2 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
//                     Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5 mr-2" />
//                     Send Message
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </ScrollReveal>
//       </div>
//     </section>
//   );
// };

// export default Contact;




import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) return;

    emailjs.sendForm(
      'service_rp2083o',
      'template_l2fjjni',
      formRef.current,
      'TXUCXKxLv-Ot9_WUV'
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ user_name: '', user_email: '', user_message: '' });

      setTimeout(() => setIsSubmitted(false), 3000);
    })
    .catch((error) => {
      setIsSubmitting(false);
      alert('Something went wrong: ' + error.text);
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Let's discuss opportunities, collaborations, or just connect!
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="max-w-2xl mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="user_message"
                  value={formData.user_message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Your message..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  isSubmitted
                    ? 'bg-green-600 text-white'
                    : isSubmitting
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 btn-glow'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Contact;