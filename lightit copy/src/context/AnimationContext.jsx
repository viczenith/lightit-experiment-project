  import { createContext, useContext, useState } from 'react';

  const AnimationContext = createContext();

  export function AnimationProvider({ children }) {
    const [reducedMotion, setReducedMotion] = useState(false);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);
    
    const toggleReducedMotion = () => {
      setReducedMotion(!reducedMotion);
      setAnimationsEnabled(!reducedMotion);
    };
    
    const toggleAnimations = () => {
      setAnimationsEnabled(!animationsEnabled);
    };
    
    return (
      <AnimationContext.Provider value={{
        reducedMotion,
        animationsEnabled,
        toggleReducedMotion,
        toggleAnimations
      }}>
        {children}
      </AnimationContext.Provider>
    );
  }

  export const useAnimation = () => useContext(AnimationContext);