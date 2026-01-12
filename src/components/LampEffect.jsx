import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function LampContainer({ children, className }) {
  return (
    <div
      className={cn(
        'relative flex min-h-[600px] flex-col items-center justify-end overflow-hidden bg-charcoal w-full pt-40 pb-20',
        className
      )}
    >
      {/* Lamp light effect container */}
      <div className="absolute top-0 left-0 right-0 h-[400px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: '15rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: `conic-gradient(from 70deg at center top, #DE924F, transparent, transparent)`,
            }}
            className="absolute right-1/2 h-56 w-[30rem] top-0"
          >
            <div className="absolute w-full left-0 bg-charcoal h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-full left-0 bg-charcoal [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          {/* Right conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: '15rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            style={{
              backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, #DE924F)`,
            }}
            className="absolute left-1/2 h-56 w-[30rem] top-0"
          >
            <div className="absolute w-40 h-full right-0 bg-charcoal [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-full right-0 bg-charcoal h-40 bottom-0 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Glow effects */}
          <div className="absolute top-32 h-48 w-full bg-charcoal blur-2xl"></div>
          <div className="absolute top-20 h-36 w-[28rem] rounded-full bg-copper opacity-40 blur-3xl"></div>
          <motion.div
            initial={{ width: '8rem' }}
            whileInView={{ width: '16rem' }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="absolute top-24 h-36 w-64 rounded-full bg-copper/70 blur-2xl"
          />

          {/* Lamp line */}
          <motion.div
            initial={{ width: '15rem' }}
            whileInView={{ width: '30rem' }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="absolute top-[7rem] h-0.5 w-[30rem] bg-copper"
          />

          {/* Top cover */}
          <div className="absolute top-0 h-28 w-full bg-charcoal"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
