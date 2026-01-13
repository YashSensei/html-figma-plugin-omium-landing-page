import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ScrollyFeatureSection from '../components/ScrollyFeatureSection';
import { Marquee } from '../components/Marquee';
import { LampContainer } from '../components/LampEffect';

// Feature cards for hero parallax - previews of the next section
const ParallaxFeatureCard = ({ type, translate }) => {
  const cards = {
    install: (
      <div className="glass-card-static p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-full border border-copper/30 bg-charcoal flex items-center justify-center text-copper font-mono text-sm font-bold">01</div>
          <span className="text-[8px] uppercase tracking-widest text-white/30">Install</span>
        </div>
        <h3 className="text-sm font-bold mb-2">Install the SDK</h3>
        <div className="bg-[#0a0a0a] border border-white/5 rounded p-3 font-mono text-[11px]">
          <span className="text-white/30">$ </span><span className="text-white/70">pip install </span><span className="text-copper">omium</span>
        </div>
      </div>
    ),
    wrap: (
      <div className="glass-card-static p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-full border border-copper/30 bg-charcoal flex items-center justify-center text-copper font-mono text-sm font-bold">02</div>
          <span className="text-[8px] uppercase tracking-widest text-white/30">Wrap</span>
        </div>
        <h3 className="text-sm font-bold mb-2">Wrap your agent</h3>
        <div className="bg-[#0a0a0a] border border-white/5 rounded p-3 font-mono text-[11px] space-y-0.5">
          <div><span className="text-copper">import</span><span className="text-white/70"> omium</span></div>
          <div><span className="text-white/70">agent = omium.</span><span className="text-copper">wrap</span><span className="text-white/70">(agent)</span></div>
        </div>
      </div>
    ),
    ship: (
      <div className="glass-card-static p-6 h-full border-copper/20">
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-full border-2 border-copper bg-copper/10 flex items-center justify-center text-copper font-mono text-sm font-bold">03</div>
          <span className="text-[8px] uppercase tracking-widest text-copper/60">Active</span>
        </div>
        <h3 className="text-sm font-bold mb-2">Ship with confidence</h3>
        <div className="bg-[#0a0a0a] border border-copper/20 rounded p-3 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="size-2 bg-green-500 rounded-full"></span>
            <span className="text-green-400/80">Monitoring active</span>
          </div>
        </div>
      </div>
    ),
    analytics: (
      <div className="glass-card-static p-6 h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="size-6 rounded bg-copper/20 flex items-center justify-center">
            <span className="text-copper text-xs">📊</span>
          </div>
          <span className="text-[10px] font-medium text-white/60">Agent Performance</span>
          <span className="text-[8px] uppercase tracking-widest text-green-400/60 bg-green-400/10 px-1.5 py-0.5 rounded ml-auto">Live</span>
        </div>
        <div className="flex items-end gap-1 h-16">
          <div className="flex-1 bg-copper/20 rounded-t" style={{ height: '45%' }}></div>
          <div className="flex-1 bg-copper/30 rounded-t" style={{ height: '65%' }}></div>
          <div className="flex-1 bg-copper/40 rounded-t" style={{ height: '55%' }}></div>
          <div className="flex-1 bg-copper/50 rounded-t" style={{ height: '80%' }}></div>
          <div className="flex-1 bg-copper/60 rounded-t" style={{ height: '70%' }}></div>
          <div className="flex-1 bg-copper rounded-t" style={{ height: '95%' }}></div>
          <div className="flex-1 bg-copper/80 rounded-t" style={{ height: '85%' }}></div>
        </div>
      </div>
    ),
    pie: (
      <div className="glass-card-static p-6 h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="size-6 rounded bg-copper/20 flex items-center justify-center">
            <span className="text-copper text-xs">📈</span>
          </div>
          <span className="text-[10px] font-medium text-white/60">Success Rate</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative size-16">
            <svg className="size-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#DE924F" strokeWidth="3" strokeDasharray="85 15" strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white">97%</span>
            </div>
          </div>
          <div className="space-y-1 text-[9px]">
            <div className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-green-500"></span><span className="text-white/50">Success</span></div>
            <div className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-copper"></span><span className="text-white/50">Recovered</span></div>
          </div>
        </div>
      </div>
    ),
    trace: (
      <div className="glass-card-static p-6 h-full">
        <div className="text-[10px] text-white/40 mb-2">Execution Trace</div>
        <div className="space-y-1.5 font-mono text-[9px]">
          <div className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-green-500"></span><span className="text-white/50">agent.start()</span></div>
          <div className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-green-500"></span><span className="text-white/50">fetch_data()</span></div>
          <div className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-copper"></span><span className="text-copper/70">checkpoint_1</span></div>
          <div className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-green-500"></span><span className="text-white/50">process()</span></div>
        </div>
      </div>
    ),
    error: (
      <div className="glass-card-static p-6 h-full border-red-500/20">
        <div className="text-[10px] text-red-400/60 mb-2">Error Detected</div>
        <div className="bg-red-500/5 border border-red-500/20 rounded p-2 font-mono text-[9px] text-red-400/80">
          <div>TimeoutError at line 42</div>
          <div className="text-white/30 mt-1">→ Auto-recovery initiated</div>
        </div>
      </div>
    ),
    checkpoint: (
      <div className="glass-card-static p-6 h-full border-copper/30">
        <div className="text-[10px] text-copper/60 mb-2">Checkpoint Saved</div>
        <div className="bg-copper/5 border border-copper/20 rounded p-2 font-mono text-[9px]">
          <div className="text-copper/80">State: step_3_complete</div>
          <div className="text-white/30 mt-1">Memory: 24.3 MB</div>
        </div>
      </div>
    ),
    terminal: (
      <div className="h-full overflow-hidden rounded-xl bg-panel border border-copper/20 shadow-lg shadow-copper/10">
        <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-white/5">
          <div className="size-2.5 rounded-full bg-[#ff5f57]"></div>
          <div className="size-2.5 rounded-full bg-[#febc2e]"></div>
          <div className="size-2.5 rounded-full bg-[#28c840]"></div>
          <span className="ml-2 text-[8px] text-white/30 font-mono">omium_demo.py</span>
        </div>
        <div className="p-4 font-mono text-[10px] leading-relaxed bg-charcoal h-full">
          <div className="text-white/40"># 3 lines to full observability</div>
          <div className="mt-2"><span className="text-copper">from</span> <span className="text-white/70">omium</span> <span className="text-copper">import</span> <span className="text-white/70">Omium</span></div>
          <div className="mt-1"><span className="text-white/70">client = </span><span className="text-copper">Omium</span><span className="text-white/70">(</span><span className="text-green-400">"..."</span><span className="text-white/70">)</span></div>
          <div className="mt-1"><span className="text-white/70">agent = client.</span><span className="text-copper">wrap</span><span className="text-white/70">(agent)</span></div>
        </div>
      </div>
    ),
  };

  // Terminal card is wider
  const isTerminal = type === 'terminal';

  return (
    <motion.div
      style={{ x: translate }}
      className={`flex-shrink-0 ${
        isTerminal ? 'h-44 w-80' : 'h-40 w-64'
      }`}
    >
      {cards[type]}
    </motion.div>
  );
};

// Define the parallax rows - terminal in middle row for prominence
const parallaxRow1 = ['install', 'analytics', 'wrap', 'trace', 'ship'];
const parallaxRow2 = ['pie', 'terminal', 'error', 'terminal', 'analytics'];
const parallaxRow3 = ['trace', 'ship', 'pie', 'wrap', 'checkpoint'];

// Testimonials data
const testimonials = [
  {
    name: 'Marcus Thorne',
    role: 'CTO, Aether Systems',
    body: "We used to debug agent failures with print statements. Now we see exactly where things broke and resume from the last checkpoint. Game changer.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQrC-fmljATjwdJE761YEFisZgu2atHC3VpYPx-rflhxvs0BnyvCmspqXGgCU8ZQjOU8vTaqTtB9HvSLWTXpJEoNjvwaV5IRIz9arR5F75mi-rdKwjh4CLktx_7JJW7ysxsCmMAWgr7_-IXLxzztehuyAS501vaFC520ijDssIqWc5zcyZ9r45lpJgvn73TaREPQtzQd0wHAkTfzQ37L04HYFnMNa84aW1_Q6gwdm-AvPhOHj6QyKkS_hjzTSzIGuYpx1ZOY6Src4',
  },
  {
    name: 'Elara Vance',
    role: 'Lead Architect, HexaDrive',
    body: "Our agents would just stop mid-workflow. No errors, no logs, nothing. Omium finally showed us what was actually happening inside.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJvoMiXrHcwO7d9-52Ppu5HVv2izPfit3Dx4no3snPTiNoblR-WHmIMbJTK_HsJQo_iRHHUFx6ws2OluXE0zIoB7SeSXxadJenkqIr9eX4pLh9sVRU4cHjd__YA8TI-inyU2VzGf0cs-z9y5g3LGCboVxFlYBeMTV_CkyKTRHyq5G9zEhtVVw437yq1SmJQMmQ-bnNHUTPTlFV78EuYCBXUEcL1ljZtpgm5oRu4tP2w6ZqfwTdp-6lfRGUroUmr_iq1nTHuMtcfHs',
  },
  {
    name: 'Julian Black',
    role: 'VP Eng, Cortex AI',
    body: "We went from re-running entire workflows to resuming from exact failure points. Saved us hours every week.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIcwDo2ucHEV8ZGehCVTjTxPYPPRQDGfEHnpPmfxv-2yb-tg1K0og3sq2QqU4_PYJnkyLo7FIAsAGrS1VHNcoGKXwOu8XkpDkzA3ZqGKIyVbsjG9rN_iuffoZwTGUCVp6zeo8I20X-k9exFxEPxbd6H9qTMpb9XauI2oz9ok49Cq4ZVCNlqYbnM_1zVimrpBLFXYJYkMfHOrMFihNZikWMH22z14UEfsiDWm4LkysA6e8GpVF-6xMnuukLHtF3_InQpKRzz6j3Uzo',
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, NeuralPath',
    body: "The checkpoint system is brilliant. We can now test edge cases by rewinding to specific states. Our QA process is completely transformed.",
    img: 'https://avatar.vercel.sh/sarah',
  },
  {
    name: 'David Kim',
    role: 'Engineering Lead, Synthetix',
    body: "Finally, observability that actually makes sense for AI agents. The execution traces are exactly what we needed for debugging complex workflows.",
    img: 'https://avatar.vercel.sh/david',
  },
  {
    name: 'Anna Rodriguez',
    role: 'CTO, Quantum Labs',
    body: "Integration took 5 minutes. Within an hour, we caught a bug that had been causing intermittent failures for weeks. Worth every penny.",
    img: 'https://avatar.vercel.sh/anna',
  },
];

// Use all testimonials in both rows for consistent composition
const firstRow = testimonials;
const secondRow = testimonials;

function TestimonialCard({ name, role, body, img }) {
  return (
    <figure className="relative w-96 cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-panel/50 p-4 hover:border-copper/30 hover:bg-panel/80 transition-all duration-300">
      <blockquote className="text-sm leading-relaxed text-white/70 mb-4">
        "{body}"
      </blockquote>
      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <div className="size-8 rounded-full bg-gradient-to-br from-copper/40 to-black overflow-hidden border border-copper/20">
          <img alt={name} className="w-full h-full object-cover opacity-80" src={img} />
        </div>
        <div>
          <figcaption className="text-xs font-bold text-white">{name}</figcaption>
          <p className="text-[9px] uppercase tracking-widest text-copper/60 font-bold">{role}</p>
        </div>
      </div>
    </figure>
  );
}

// FAQ Accordion Item
function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-panel/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-base font-semibold text-white">{question}</span>
        <span className={`text-white/40 text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const heroRef = useRef(null);

  // Hero parallax scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // Parallax cards animations
  // Cards come down normally, then fade out quickly after settling
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 0.6], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  // Cards fade in, stay visible while settling, then QUICKLY fade out (0.55 to 0.65)
  const cardsOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.15, 0.55, 0.65], [0.2, 1, 1, 0]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-600, 0]),
    springConfig
  );

  // Hero header fades out - stays longer, then quick fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.6], [1, 1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0.5, 0.65], [0, -100]);


  // Scroll animation refs for each section
  const [howItWorksRef, howItWorksVisible] = useScrollAnimation({ threshold: 0.2 });
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [faqRef, faqVisible] = useScrollAnimation({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <div className="overflow-x-hidden page-enter">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="h-[140vh] py-20 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d] bg-charcoal"
      >
        {/* Hero Header Content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl relative mx-auto py-20 md:py-32 px-12 w-full z-20"
        >
          <div className="text-[10px] font-mono text-copper uppercase tracking-[0.4em] mb-6 animate-fade-in-up">
            Observability for AI Agents
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8 animate-fade-in-up stagger-1 max-w-4xl">
            When AI agents fail,<br />
            <span className="text-copper">know exactly why.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed mb-10 animate-fade-in-up stagger-2">
            Make failures visible, debuggable, and recoverable. The fault-tolerant runtime for production multi-agent systems.
          </p>
          <div className="flex gap-4 animate-fade-in-up stagger-3">
            {isAuthenticated ? (
              <a href="https://app.omium.ai/" target="_blank" rel="noopener noreferrer" className="btn-hover px-8 py-4 bg-copper text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg">
                Go to Dashboard
              </a>
            ) : (
              <Link to="/auth" className="btn-hover px-8 py-4 bg-copper text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg">
                Start Free
              </Link>
            )}
            <Link to="/contact" className="px-8 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-all rounded-lg">
              Book Demo
            </Link>
          </div>
        </motion.div>

        {/* Parallax Feature Card Rows */}
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity: cardsOpacity,
          }}
          className="relative z-10"
        >
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 mb-6">
            {parallaxRow1.map((type, idx) => (
              <ParallaxFeatureCard type={type} translate={translateX} key={`row1-${type}-${idx}`} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row space-x-6 mb-6">
            {parallaxRow2.map((type, idx) => (
              <ParallaxFeatureCard type={type} translate={translateXReverse} key={`row2-${type}-${idx}`} />
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-6">
            {parallaxRow3.map((type, idx) => (
              <ParallaxFeatureCard type={type} translate={translateX} key={`row3-${type}-${idx}`} />
            ))}
          </motion.div>
        </motion.div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent z-30 pointer-events-none"></div>
      </section>

      {/* How it Works Section */}
      <section ref={howItWorksRef} className="py-32 px-12">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Three lines. Full observability.</h2>
            <p className="text-white/40 max-w-xl mx-auto">Add Omium to any agent in under a minute. No architecture changes required.</p>
          </div>

          <div className="relative">
            {/* Top Row - 3 Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Step 1 */}
              <div className={`glass-card-static p-8 relative transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="size-12 rounded-full border border-copper/30 bg-charcoal flex items-center justify-center text-copper font-mono text-lg font-bold">01</div>
                  <span className="text-[9px] uppercase tracking-widest text-white/30">Install</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Install the SDK</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">One package. Python, Node, or any framework.</p>
                <div className="bg-[#0a0a0a] border border-white/5 rounded p-4 font-mono text-[13px]">
                  <span className="text-white/30 select-none">$ </span><span className="text-white/70">pip install </span><span className="text-copper">omium</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`glass-card-static p-8 relative transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="size-12 rounded-full border border-copper/30 bg-charcoal flex items-center justify-center text-copper font-mono text-lg font-bold">02</div>
                  <span className="text-[9px] uppercase tracking-widest text-white/30">Wrap</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Wrap your agent</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">One line. Works with LangChain, OpenAI, or custom.</p>
                <div className="bg-[#0a0a0a] border border-white/5 rounded p-4 font-mono text-[13px] space-y-1">
                  <div><span className="text-copper">import</span><span className="text-white/70"> omium</span></div>
                  <div><span className="text-white/70">agent = omium.</span><span className="text-copper">wrap</span><span className="text-white/70">(agent)</span></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`glass-card-static p-8 relative border-copper/20 transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-8">
                  <div className="size-12 rounded-full border-2 border-copper bg-copper/10 flex items-center justify-center text-copper font-mono text-lg font-bold">03</div>
                  <span className="text-[9px] uppercase tracking-widest text-copper/60">Active</span>
                </div>
                <h3 className="text-lg font-bold mb-3">Ship with confidence</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">Tracing, checkpoints, and recovery — automatic.</p>
                <div className="bg-[#0a0a0a] border border-copper/20 rounded p-4 font-mono text-[13px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="size-2 bg-green-500 rounded-full"></span>
                      <span className="text-green-400/80">Monitoring active</span>
                    </div>
                    <span className="text-white/20 text-[10px]">3 agents</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row - 2 Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Usage Analytics Card */}
              <div className={`glass-card-static p-8 relative transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
                {/* Mini dashboard preview */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-copper/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-copper text-lg">monitoring</span>
                      </div>
                      <span className="text-xs font-medium text-white/60">Agent Performance</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-green-400/60 bg-green-400/10 px-2 py-1 rounded">Live</span>
                  </div>
                  {/* Bar chart visualization */}
                  <div className="flex items-end gap-2 h-24 mb-3">
                    <div className="flex-1 bg-copper/20 rounded-t" style={{ height: '45%' }}></div>
                    <div className="flex-1 bg-copper/30 rounded-t" style={{ height: '65%' }}></div>
                    <div className="flex-1 bg-copper/40 rounded-t" style={{ height: '55%' }}></div>
                    <div className="flex-1 bg-copper/50 rounded-t" style={{ height: '80%' }}></div>
                    <div className="flex-1 bg-copper/60 rounded-t" style={{ height: '70%' }}></div>
                    <div className="flex-1 bg-copper rounded-t" style={{ height: '95%' }}></div>
                    <div className="flex-1 bg-copper/80 rounded-t" style={{ height: '85%' }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/30">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">Usage Analytics</h3>
                <p className="text-white/40 text-sm leading-relaxed">Track agent executions, success rates, and resource consumption across your entire fleet.</p>
              </div>

              {/* Failure Insights Card */}
              <div className={`glass-card-static p-8 relative transition-all duration-500 ${howItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.5s' }}>
                {/* Pie chart / stats preview */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-copper/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-copper text-lg">pie_chart</span>
                      </div>
                      <span className="text-xs font-medium text-white/60">Failure Breakdown</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">Last 7 days</span>
                  </div>
                  <div className="flex items-center gap-6">
                    {/* Donut chart */}
                    <div className="relative size-24 flex-shrink-0">
                      <svg className="size-24 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4"/>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#DE924F" strokeWidth="4" strokeDasharray="60 40" strokeLinecap="round"/>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="-60" strokeLinecap="round"/>
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85" strokeLinecap="round"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">97%</span>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-green-500"></span>
                          <span className="text-xs text-white/60">Success</span>
                        </div>
                        <span className="text-xs font-mono text-white/80">2,847</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-copper"></span>
                          <span className="text-xs text-white/60">Recovered</span>
                        </div>
                        <span className="text-xs font-mono text-white/80">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-amber-500"></span>
                          <span className="text-xs text-white/60">Failed</span>
                        </div>
                        <span className="text-xs font-mono text-white/80">12</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">Failure Insights</h3>
                <p className="text-white/40 text-sm leading-relaxed">Understand why agents fail with detailed breakdowns. Identify patterns and fix issues before they scale.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrollytelling Features Section */}
      <ScrollyFeatureSection />


      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="min-h-screen flex flex-col justify-center overflow-hidden py-16">
        <div className={`text-center mb-6 transition-all duration-700 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-crimson italic tracking-tight">
            What Our <span className="text-copper">Users</span> Say
          </h2>
        </div>

        <div className={`relative flex flex-col justify-center transition-all duration-700 ${testimonialsVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Marquee pauseOnHover className="[--duration:35s] [--gap:1rem] mb-4">
            {firstRow.map((testimonial, idx) => (
              <TestimonialCard key={`first-${testimonial.name}-${idx}`} {...testimonial} />
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover className="[--duration:35s] [--gap:1rem]">
            {secondRow.map((testimonial, idx) => (
              <TestimonialCard key={`second-${testimonial.name}-${idx}`} {...testimonial} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent" />
        </div>

        {/* Proud Partners Section */}
        <div className={`mt-16 transition-all duration-700 delay-300 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Proud Partners Of</p>
          </div>
          <div className="relative overflow-hidden">
            <Marquee pauseOnHover className="[--duration:25s] [--gap:4rem]" repeat={3}>
              <span className="text-xl font-serif italic tracking-widest text-white/40 hover:text-white/70 transition-colors">AETHER.</span>
              <span className="text-xl font-bold tracking-tighter text-white/40 hover:text-white/70 transition-colors">HEXA<span className="text-copper/60">DRIVE</span></span>
              <span className="text-xl font-mono tracking-tighter uppercase font-light text-white/40 hover:text-white/70 transition-colors">Synthetix</span>
              <span className="text-xl font-display font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors">Cortex</span>
              <span className="text-xl font-serif italic text-white/40 hover:text-white/70 transition-colors">Nova Labs</span>
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-charcoal to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-charcoal to-transparent" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-32 px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Frequently asked questions</h2>
            <p className="text-white/50 text-base leading-relaxed">
              Answers to common questions about Omium and its features. If you have any other questions, please don't hesitate to <Link to="/contact" className="text-copper hover:underline">contact us</Link>.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className={`space-y-3 transition-all duration-700 delay-200 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FAQItem
              question="What is Omium?"
              answer="Omium is an observability platform designed specifically for AI agents. It provides execution tracing, checkpointing, failure detection, and recovery capabilities to help you debug and monitor your AI workflows in production."
            />
            <FAQItem
              question="How does it work?"
              answer="Simply install our SDK and wrap your agent with a single line of code. Omium automatically captures execution traces, saves checkpoints, and monitors for failures. When something breaks, you can see exactly what happened and resume from the last checkpoint."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Yes. All data is encrypted in transit and at rest. You control data retention policies, and we never share your data with third parties. Enterprise plans include additional security features like SSO and custom data handling."
            />
            <FAQItem
              question="Can I use it for free?"
              answer="Yes! Our free tier includes 500 agent executions per month, 7-day data retention, and core observability features. It's perfect for getting started and testing Omium with your projects."
            />
          </div>
        </div>
      </section>

      {/* CTA Section with Lamp Effect */}
      <section ref={ctaRef}>
        <LampContainer>
          <motion.h2
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight text-center"
          >
            STOP DEBUGGING<br/>
            <span className="italic font-crimson bg-gradient-to-br from-copper to-white bg-clip-text text-transparent">BLINDLY.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed text-center"
          >
            See what your agents are doing. Know why they fail. Recover without re-running everything.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {isAuthenticated ? (
              <a href="https://app.omium.ai/" target="_blank" rel="noopener noreferrer" className="btn-hover px-8 py-4 bg-copper text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg">
                Go to Dashboard
              </a>
            ) : (
              <Link to="/auth" className="btn-hover px-8 py-4 bg-copper text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg">
                Start Free
              </Link>
            )}
            <Link to="/contact" className="px-8 py-4 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest hover:border-copper hover:text-copper transition-all rounded-lg">
              Book a Demo
            </Link>
          </motion.div>
        </LampContainer>
      </section>
    </div>
  );
}
