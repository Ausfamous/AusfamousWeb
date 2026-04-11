import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="w-[2px] h-32 bg-platinum/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gold rounded-full"
          style={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}