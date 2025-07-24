// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };


module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Vibrant, science-themed palette
        'science-blue': '#3B82F6',    // Brighter blue
        'reaction-pink': '#EC4899',   // Vibrant pink
        'lab-purple': '#8B5CF6',      // Royal purple
        'element-teal': '#06B6D4',    // Bright teal
        'success-green': '#10B981',   // Energetic green
        'warning-orange': '#F59E0B',  // Warm orange
        
        // Neutral tones
        'light-bg': '#F9FAFB',
        'card-bg': '#FFFFFF',
        'dark-text': '#1F2937',
        'medium-text': '#4B5563'
      },
      fontFamily: {
        heading: ['"Exo 2"', 'sans-serif'],
        body: ['"Nunito"', 'sans-serif']
      }
    }
  },
  plugins: [],
};
