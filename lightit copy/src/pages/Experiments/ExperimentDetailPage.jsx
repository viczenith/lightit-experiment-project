import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import ScienceBadge from '../../components/experiments/ScienceBadge';

// YouTube URL conversion
const getEmbedUrl = (url) => {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1`
    : url;
};


const AccordionItem = ({ title, children, isOpen, onClick, hasVideo = false }) => (
  <div className="border-0 rounded-xl overflow-hidden mb-4 bg-gradient-to-r from-white to-indigo-50 shadow-lg hover:shadow-xl transition-all">
    <motion.button
      className={`w-full flex justify-between items-center p-5 text-left ${
        isOpen ? 'bg-gradient-to-r from-indigo-100 to-blue-100' : ''
      }`}
      onClick={onClick}
      initial={false}
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        <motion.span 
          className="mr-3 text-indigo-600"
          animate={{ rotate: isOpen ? 90 : 0 }}
        >
          ▶
        </motion.span>
        {title}
      </h2>
      <motion.span
        className="text-indigo-600 text-2xl"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {hasVideo ? '🎬' : '📖'}
      </motion.span>
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: "auto",
            opacity: 1,
            transition: { 
              height: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.3, delay: 0.1 }
            }
          }}
          exit={{ 
            height: 0,
            opacity: 0,
            transition: { 
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 }
            }
          }}
          className="overflow-hidden"
        >
          <div className={`p-5 ${hasVideo ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-white'}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function ExperimentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exp, setExp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchExperiment(allowHidden = false) {
      try {
        const url = allowHidden
          ? `/auth/experiments/${id}`
          : `/experiments/${id}`;
        const res = await api.get(url);
        if (isMounted) {
          setExp(res.data);
          setNotFound(false);
          
          // Open first section by default
          setOpenSections({ description: true });
        }
      } catch (err) {
        if (
          err.response?.status === 404 &&
          user?.role === 'educator'
        ) {
          await fetchExperiment(true);
        } else {
          if (isMounted) setNotFound(true);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchExperiment();
    return () => {
      isMounted = false;
    };
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full"
        />
      </div>
    );
  }

  if (notFound || !exp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Experiment not found</h2>
          <p className="mb-6 text-gray-600">The requested experiment could not be located in our database.</p>
          <motion.button
            onClick={() => navigate('/experiments')}
            className="btn-primary bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Experiments
          </motion.button>
        </div>
      </div>
    );
  }

  const embedUrl = getEmbedUrl(exp.videoUrl);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
        
          {/* Image Gallery */}
          {exp.images?.length > 0 && (
            <motion.div 
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-1 gap-4">
                {exp.images.map((src, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-xl shadow-lg h-64 md:h-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={src}
                      alt={`${exp.title} screenshot ${i+1}`}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="p-8 bg-gradient-to-r from-white to-indigo-50 shadow-lg hover:shadow-xl transition-all">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl text-black font-bold mb-2">{exp.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <ScienceBadge type="grade" value={exp.grade} />
                  <ScienceBadge type="subject" value={exp.subject} />
                </div>
              </div>
              
              <motion.span
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                  exp.status === 'pending'
                    ? 'bg-yellow-500 text-yellow-900'
                    : exp.status === 'approved'
                    ? 'bg-green-500 text-green-900'
                    : 'bg-red-500 text-red-900'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
              </motion.span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="p-6 space-y-6">
            <AccordionItem 
              title="Description" 
              isOpen={openSections.description}
              onClick={() => toggleSection('description')}
            >
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  {exp.description}
                </p>
               
              </motion.div>
            </AccordionItem>

            <AccordionItem 
              title="Materials Used" 
              isOpen={openSections.materials}
              onClick={() => toggleSection('materials')}
            >
              <ul className="space-y-3">
                {exp.materials.map((m, i) => (
                  <motion.li 
                    key={i}
                    className="text-gray-700 text-lg relative pl-8 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-5 before:bg-indigo-500 before:rounded-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {m}
                  </motion.li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem 
              title="Procedure" 
              isOpen={openSections.procedure}
              onClick={() => toggleSection('procedure')}
            >
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-gray-700 text-lg whitespace-pre-wrap leading-relaxed">
                  {exp.procedure}
                </p>
              </div>
            </AccordionItem>

             <AccordionItem 
              title="Practical Video" 
              isOpen={openSections.video}
              onClick={() => toggleSection('video')}
            >
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-700 text-lg leading-relaxed">
                  {exp.video}
                </p>
                
                {embedUrl && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                      <span className="mr-2">📺</span> Video Demonstration
                    </h3>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={embedUrl}
                          title="Experiment Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AccordionItem>


            <AccordionItem 
              title="Safety Precautions" 
              isOpen={openSections.precautions}
              onClick={() => toggleSection('precautions')}
              hasVideo={false}
            >
              <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                <p className="text-gray-700 text-lg whitespace-pre-wrap">
                  {exp.precautions}
                </p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Expected Results" 
              isOpen={openSections.results}
              onClick={() => toggleSection('results')}
            >
              <div className="bg-green-50 p-5 rounded-xl border-l-4 border-green-500">
                <p className="text-gray-700 text-lg whitespace-pre-wrap">
                  {exp.results}
                </p>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Discussion & Analysis" 
              isOpen={openSections.discussion}
              onClick={() => toggleSection('discussion')}
            >
              <div className="bg-purple-50 p-5 rounded-xl border-l-4 border-purple-500">
                <p className="text-gray-700 text-lg whitespace-pre-wrap">
                  {exp.discussion}
                </p>
              </div>
            </AccordionItem>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}