// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';
// import ReactionSystem from '../ui/ReactionSystem';
// import ScienceBadge from './ScienceBadge';

// const statusStyles = {
//   pending:  'bg-yellow-100 text-yellow-800',
//   approved: 'bg-green-100 text-green-800',
//   rejected: 'bg-red-100 text-red-800',
// };

// export default function ExperimentCard({ experiment }) {
//   const navigate = useNavigate();
//   const {
//     id,
//     title,
//     grade,
//     subject,
//     description = '',
//     images = [],
//     creatorName,
//     createdAt,
//     status = 'pending',
//     reactions = 0,
//   } = experiment;

//   // truncate description
//   const shortDesc = description.length > 80
//     ? description.slice(0, 80).trim() + '…'
//     : description;

//   const handleClick = () => {
//     navigate(
//       `/experiments/${grade}/` +
//       `${encodeURIComponent(title)}/` +
//       `${id}`
//     );
//   };

//   return (
//     <motion.div
//       onClick={handleClick}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
//       transition={{ duration: 0.3 }}
//       className="relative bg-white rounded-2xl shadow border border-gray-200 cursor-pointer overflow-hidden flex flex-col"
//     >
//       {/* Status badge */}
//       <div className="absolute top-3 right-3 z-10">
//         <span
//           className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
//             statusStyles[status] || statusStyles.pending
//           }`}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </span>
//       </div>

//       {/* Image */}
//       <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
//         {images.length > 0 ? (
//           <img
//             src={images[0]}
//             alt={title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="text-gray-400">No Image</div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex-1 flex flex-col">
//         {/* Grade & Subject */}
//         <div className="flex gap-2 mb-2">
//           <ScienceBadge type="grade"   value={grade}   />
//           <ScienceBadge type="subject" value={subject} />
//         </div>

//         {/* Title */}
//         <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
//           {title}
//         </h3>

//         {/* Description */}
//         {shortDesc && (
//           <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-2">
//             {shortDesc}
//           </p>
//         )}

//         {/* Reactions */}
//         <ReactionSystem reactions={reactions} />

//         {/* Footer */}
//         <div className="mt-3 text-xs text-gray-500 flex justify-between">
//           <span>By {creatorName}</span>
//           {createdAt && (
//             <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactionSystem from '../ui/ReactionSystem';
import ScienceBadge from './ScienceBadge';

const statusStyles = {
  pending:  'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function ExperimentCard({ experiment }) {
  const navigate = useNavigate();

  const id = experiment._id || experiment.id;

  const {
    title = 'Untitled Experiment',
    grade = 'N/A',
    subject = 'N/A',
    description = 'No description provided.',
    images = [],
    creatorName = 'Unknown',
    createdAt,
    status = 'pending',
    reactions = 0,
  } = experiment;

  const safeDesc = String(description);
  const shortDesc = safeDesc.length > 80
    ? safeDesc.slice(0, 80).trim() + '…'
    : safeDesc;

  const handleClick = () => {
    navigate(
      `/experiments/${grade}/${encodeURIComponent(title)}/${id}`
    );
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl shadow border border-gray-200 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Status badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
            statusStyles[status] || statusStyles.pending
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Thumbnail */}
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex gap-2 mb-2">
          <ScienceBadge type="grade"   value={grade}   />
          <ScienceBadge type="subject" value={subject} />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-2">
          {shortDesc}
        </p>

        <ReactionSystem reactions={reactions} />

        <div className="mt-3 text-xs text-gray-500 flex justify-between">
          <span>By {creatorName}</span>
          {createdAt && (
            <span>{format(new Date(createdAt), 'MMM d, yyyy')}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
