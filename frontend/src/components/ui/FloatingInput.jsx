// import { motion } from 'framer-motion';
// import { useState } from 'react';

// export default function FloatingInput({ 
//   label, 
//   type = 'text', 
//   value, 
//   onChange, 
//   options = [],
//   ...props 
// }) {
//   const [focused, setFocused] = useState(false);
  
//   const handleTextChange = (e) => {
//     // onChange(e.target.value);
//     onChange(e);
//   };
  
//   const handleSelectChange = (value) => {
//     onChange(value);
//   };

//   return (
//     <div className="relative">
//       {type === 'select' ? (
//         <div className="relative">
//           <select
//             value={value}
//             onChange={(e) => handleSelectChange(e.target.value)}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
//             {...props}
//           >
//             <option value="" disabled hidden></option>
//             {options.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//           <motion.label
//             initial={{ y: 18, x: 16, scale: 1 }}
//             animate={focused || value ? { 
//               y: 4, 
//               x: 12, 
//               scale: 0.85 
//             } : {}}
//             className={`absolute left-0 pointer-events-none ${
//               focused || value ? 'text-science-blue' : 'text-gray-500'
//             }`}
//           >
//             {label}
//           </motion.label>
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//             </svg>
//           </div>
//         </div>
//       ) : type === 'textarea' ? (
//         <div className="relative">
//           <textarea
//             value={value}
//             onChange={handleTextChange}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
//             {...props}
//           />
//           <motion.label
//             initial={{ y: 18, x: 16, scale: 1 }}
//             animate={focused || value ? { 
//               y: 4, 
//               x: 12, 
//               scale: 0.85 
//             } : {}}
//             className={`absolute left-0 pointer-events-none ${
//               focused || value ? 'text-science-blue' : 'text-gray-500'
//             }`}
//           >
//             {label}
//           </motion.label>
//         </div>
//       ) : (
//         <div className="relative">
//           <input
//             type={type}
//             value={value}
//             onChange={handleTextChange}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
//             {...props}
//           />
//           <motion.label
//             initial={{ y: 18, x: 16, scale: 1 }}
//             animate={focused || value ? { 
//               y: 4, 
//               x: 12, 
//               scale: 0.85 
//             } : {}}
//             className={`absolute left-0 pointer-events-none ${
//               focused || value ? 'text-science-blue' : 'text-gray-500'
//             }`}
//           >
//             {label}
//           </motion.label>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FloatingInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  options = [],
  name, // Add name prop
  ...props 
}) {
  const [focused, setFocused] = useState(false);
  
  const handleTextChange = (e) => {
    // Pass both name and value
    onChange(name, e.target.value);
  };
  
  const handleSelectChange = (e) => {
    // Pass both name and value
    onChange(name, e.target.value);
  };

  return (
    <div className="relative">
      {type === 'select' ? (
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={handleSelectChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg bg-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
            {...props}
          >
            <option value="" disabled hidden></option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <motion.label
            initial={{ y: 18, x: 16, scale: 1 }}
            animate={focused || value ? { 
              y: 4, 
              x: 12, 
              scale: 0.85 
            } : {}}
            className={`absolute left-0 pointer-events-none ${
              focused || value ? 'text-science-blue' : 'text-gray-500'
            }`}
          >
            {label}
          </motion.label>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      ) : type === 'textarea' ? (
        <div className="relative">
          <textarea
            name={name}
            value={value}
            onChange={handleTextChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
            {...props}
          />
          <motion.label
            initial={{ y: 18, x: 16, scale: 1 }}
            animate={focused || value ? { 
              y: 4, 
              x: 12, 
              scale: 0.85 
            } : {}}
            className={`absolute left-0 pointer-events-none ${
              focused || value ? 'text-science-blue' : 'text-gray-500'
            }`}
          >
            {label}
          </motion.label>
        </div>
      ) : (
        <div className="relative">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleTextChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pt-5 pb-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-science-blue focus:border-transparent"
            {...props}
          />
          <motion.label
            initial={{ y: 18, x: 16, scale: 1 }}
            animate={focused || value ? { 
              y: 4, 
              x: 12, 
              scale: 0.85 
            } : {}}
            className={`absolute left-0 pointer-events-none ${
              focused || value ? 'text-science-blue' : 'text-gray-500'
            }`}
          >
            {label}
          </motion.label>
        </div>
      )}
    </div>
  );
}