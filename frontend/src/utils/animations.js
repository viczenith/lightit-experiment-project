export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

export const scienceParticleConfig = {
  particles: {
    number: { value: 30 },
    size: { value: 3 },
    shape: { 
      type: 'images',
      images: [
        { src: '/flask.png', height: 20, width: 20 },
        { src: '/atom.png', height: 20, width: 20 },
        { src: '/beaker.png', height: 20, width: 20 }
      ]
    },
    move: { speed: 2 },
    opacity: { value: 0.5, random: true }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: 'repulse' }
    }
  }
};