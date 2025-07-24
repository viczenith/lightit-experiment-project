  // import Particles from 'react-particles-js';
  import Particles from 'react-tsparticles';

  export default function ParticleBackground() {
    return (
      <Particles
        className="absolute inset-0 -z-10"
        params={{
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
        }}
      />
    );
  }