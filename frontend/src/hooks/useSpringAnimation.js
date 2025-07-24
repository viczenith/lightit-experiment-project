import { useSpring, animated } from '@react-spring/web';

export function useSpringAnimation(config = {}) {
  const [spring, api] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
    ...config
  }));
  
  return {
    spring,
    api,
    Animated: animated.div
  };
}