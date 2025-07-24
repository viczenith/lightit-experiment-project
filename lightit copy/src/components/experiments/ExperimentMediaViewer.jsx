import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ExperimentMediaViewer({ media }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Safe destructure
  const videoUrl = media?.video || '';
  const images = Array.isArray(media?.images) ? media.images : [];

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Append YouTube params to suppress related videos & branding
  const formattedVideoUrl = videoUrl.includes('youtube')
    ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}rel=0&modestbranding=1`
    : videoUrl;

  if (!videoUrl && images.length === 0) {
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center text-gray-500">
        No media available.
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black">
      {videoUrl ? (
        <ReactPlayer
          url={formattedVideoUrl}
          width="100%"
          height="100%"
          playing={isPlaying}
          controls
          light={images[0] || false}
          playIcon={
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-black/50 rounded-full p-4 text-white"
            >
              <FaPlay size={32} />
            </motion.div>
          }
          onError={(e) => console.error('Player error:', e)}
        />
      ) : (
        <div className="relative h-full overflow-hidden">
          <motion.img
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={images[currentImage]}
            alt={`Experiment image ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
