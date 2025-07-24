import { useSpring, animated } from '@react-spring/web';

export default function ScienceBackground() {
  const [props] = useSpring(() => ({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: { reverse: true },
  }));

  return (
    <animated.div
      className="fixed inset-0 -z-10"
      style={{
        ...props,
        background: 'linear-gradient(45deg, #4cc9f0, #f72585, #7209b7, #3a0ca3)',
        backgroundSize: '400% 400%',
        opacity: 0.1
      }}
    />
  );
}