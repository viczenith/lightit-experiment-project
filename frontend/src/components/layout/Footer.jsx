  import { motion } from 'framer-motion';
  import { FaFlask, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

  export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-science-blue to-lab-purple text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <FaFlask className="text-3xl mr-2" />
                </motion.div>
                <h3 className="text-2xl font-bold" style={{ fontFamily: 'Comic Neue' }}>
                  Light<span className="text-reaction-orange">it</span>
                </h3>
              </div>
              <p className="mb-4 max-w-md">
                Making science experiments accessible to students everywhere. 
                Join our mission to democratize science education.
              </p>
              <div className="flex space-x-4">
                {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="bg-white/20 p-2 rounded-full"
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Experiments', 'Virtual Lab', 'For Educators', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; {currentYear} Lightit. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    );
  }