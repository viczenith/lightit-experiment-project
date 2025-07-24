import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import ExperimentCard from '../../components/experiments/ExperimentCard';
import { useExperiments } from '../../context/ExperimentContext';

// Helper to slugify titles
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '') 
    .replace(/-+$/, '');

export default function TrendingExperiments() {
  const navigate = useNavigate();
  const { experiments } = useExperiments();

  // Take only approved experiments, sort by reactions descending, take top 3
  const topThree = useMemo(() => {
    return [...experiments]
      .filter((e) => e.status === 'approved')
      .sort((a, b) => (b.reactions || 0) - (a.reactions || 0))
      .slice(0, 3);
  }, [experiments]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 rounded-3xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Trending Experiments
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Most popular experiments this week
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topThree.map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -10 }}
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`View ${exp.title} experiment`}
              onClick={() =>
                navigate(
                  `/experiments/${exp.grade}/${slugify(exp.title)}/${exp._id}`
                )
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(
                    `/experiments/${exp.grade}/${slugify(exp.title)}/${exp._id}`
                  );
                }
              }}
            >
              <ExperimentCard
                experiment={exp}
                onClick={() =>
                  navigate(
                    `/experiments/${exp.grade}/${slugify(exp.title)}/${exp._id}`
                  )
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
