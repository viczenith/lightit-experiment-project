import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { FaInfoCircle, FaFlask, FaFire } from 'react-icons/fa';

// 3D Equipment Models
function Beaker({ position, onClick, content }) {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} position={position} onClick={onClick} castShadow>
      <cylinderGeometry args={[0.5, 0.7, 1, 32]} />
      <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} />
      <Html position={[0, 1.2, 0]}>
        <div className="bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {content || 'Empty'}
        </div>
      </Html>
    </mesh>
  );
}

function BunsenBurner({ position, isActive }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 32]} />
        <meshStandardMaterial color="#a0a0a0" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="#808080" />
      </mesh>
      {isActive && (
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="#ff5722" />
        </mesh>
      )}
    </group>
  );
}

export default function VirtualLab() {
  const [equipment, setEquipment] = useState([]);
  const [activeTool, setActiveTool] = useState('beaker');
  const [isExperimentActive, setIsExperimentActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [beakerContents, setBeakerContents] = useState({});

  const parameters = {
    temperature: 25,
    pressure: 1.0,
    ph: 7.0,
    reactionRate: 0,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const addEquipment = (type, position) => {
    const id = Date.now();
    setEquipment([
      ...equipment,
      {
        id,
        type,
        position: [
          position[0] || Math.random() * 4 - 2,
          0,
          position[2] || Math.random() * 4 - 2,
        ],
      },
    ]);
    if (type === 'beaker') {
      setBeakerContents((prev) => ({ ...prev, [id]: 'Water' }));
    }
  };

  const handleCanvasClick = (e) => {
    if (!activeTool || isExperimentActive) return;
    const x = (e.clientX / window.innerWidth) * 10 - 5;
    const z = -(e.clientY / window.innerHeight) * 10 + 5;
    addEquipment(activeTool, [x, 0, z]);
  };

  const startExperiment = () => {
    if (equipment.length === 0) return;
    setIsExperimentActive(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      parameters.temperature += 5;
      parameters.reactionRate = progress / 100;
      if (progress >= 100) {
        clearInterval(interval);
        setIsExperimentActive(false);
        alert(
          `Experiment completed!\nFinal temperature: ${parameters.temperature}°C\nReaction rate: ${parameters.reactionRate.toFixed(
            2
          )}`
        );
      }
    }, 1000);
  };

  const changeBeakerContent = (id) => {
    const contents = ['Water', 'Acid', 'Base', 'Salt Solution', 'Organic Compound'];
    const currentIndex = contents.indexOf(beakerContents[id]);
    const nextIndex = (currentIndex + 1) % contents.length;
    setBeakerContents({ ...beakerContents, [id]: contents[nextIndex] });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px]">
          <Canvas
            shadows
            camera={{ position: [0, 5, 10], fov: 50 }}
            onClick={handleCanvasClick}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} castShadow />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

            {/* Lab Table */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color="#d0d0d0" />
            </mesh>

            {/* Equipment */}
            {equipment.map((item) =>
              item.type === 'beaker' ? (
                <Beaker
                  key={item.id}
                  position={item.position}
                  content={beakerContents[item.id]}
                  onClick={() => changeBeakerContent(item.id)}
                />
              ) : (
                <BunsenBurner
                  key={item.id}
                  position={item.position}
                  isActive={isExperimentActive}
                />
              )
            )}

            {/* Instructions */}
            {showInstructions && (
              <Html position={[0, 3, 0]} transform occlude>
                <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg"
                    style={{
                      width: '90vw',
                      maxWidth: '380px',
                      fontSize: 'clamp(12px, 2.5vw, 16px)',
                      lineHeight: 1.6
                    }}>
                  <h3 className="font-bold text-lg mb-3 text-center">Virtual Lab Instructions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Click to place equipment</li>
                    <li>Select beaker or burner from toolbar</li>
                    <li>Click on beakers to change contents</li>
                    <li>Click "Start Experiment" to begin</li>
                  </ul>
                </div>
              </Html>
            )}


          </Canvas>

          {/* Top Left Label */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm flex items-center max-w-[80vw]">
            <FaFlask className="mr-2" />
            Virtual Lab
          </div>

          {/* Top Right Status */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs sm:text-sm max-w-[80vw] overflow-x-auto">
            {parameters.temperature}°C | pH: {parameters.ph.toFixed(1)}
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-full flex items-center ${
                  activeTool === 'beaker'
                    ? 'bg-science-blue text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTool('beaker')}
              >
                <FaFlask className="mr-2" />
                Add Beaker
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-full flex items-center ${
                  activeTool === 'burner'
                    ? 'bg-reaction-orange text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTool('burner')}
              >
                <FaFire className="mr-2" />
                Add Burner
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full flex items-center"
                onClick={() => setEquipment([])}
              >
                Clear All
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-full flex items-center ${
                  showInstructions ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setShowInstructions(prev => !prev)}
              >
                <FaInfoCircle className="mr-2" />
                {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-white rounded-full flex items-center ${
                isExperimentActive ? 'bg-red-500' : 'bg-lab-purple'
              }`}
              onClick={startExperiment}
              disabled={equipment.length === 0}
            >
              {isExperimentActive ? (
                <>
                  <span className="h-3 w-3 rounded-full bg-white mr-2 animate-pulse"></span>
                  Experiment Running...
                </>
              ) : (
                'Start Experiment'
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
