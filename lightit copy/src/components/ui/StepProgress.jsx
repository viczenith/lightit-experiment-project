  import { motion } from 'framer-motion';

  export default function StepProgress({ steps, currentStep }) {
    const progress = (currentStep / (steps.length - 1)) * 100;
    
    return (
      <div className="w-full">
        <div className="flex justify-between mb-2 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative z-10 flex flex-col items-center"
              style={{ width: `${100 / (steps.length - 1)}%` }}
            >
              <motion.div
                animate={{ 
                  scale: currentStep === index ? 1.2 : 1,
                  backgroundColor: currentStep >= index ? '#4CC9F0' : '#E5E7EB'
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1"
              >
                {index + 1}
              </motion.div>
              <span className={`text-xs text-center ${currentStep === index ? 'font-bold text-science-blue' : 'text-gray-500'}`}>
                {step}
              </span>
            </div>
          ))}
          
          {/* Progress line */}
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
            <motion.div 
              className="h-full bg-science-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    );
  }