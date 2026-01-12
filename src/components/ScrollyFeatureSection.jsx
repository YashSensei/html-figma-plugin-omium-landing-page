import { useScrollyTelling } from '../hooks/useScrollyTelling';
import AnimatedTerminal from './AnimatedTerminal';

// Feature content for each step
const features = [
  {
    number: '01',
    label: 'Checkpoint',
    title: 'Execution Checkpointing',
    description: 'Every step of your AI workflow is saved. Inputs, outputs, tool results, memory state. On failure, execution halts exactly where it broke. Resume, rollback, or branch from any checkpoint.',
    stats: [
      { label: 'State Saved', value: 'Every Step' },
      { label: 'Recovery', value: 'Instant' },
    ],
  },
  {
    number: '02',
    label: 'Diagnose & Fix',
    title: 'Detect. Suggest. Fix.',
    description: "When something breaks, Omium doesn't just tell you what failed. It suggests a fix, applies it with your approval, and resumes execution automatically.",
    stats: [
      { label: 'Fix Suggestion', value: 'AI-Powered' },
      { label: 'Apply Mode', value: 'One-Click' },
    ],
  },
  {
    number: '03',
    label: 'Recover',
    title: 'Resume from Checkpoint',
    description: 'Rewind to the last valid checkpoint. Apply the fix. Resume execution. No data loss, no duplicate work, no re-running entire workflows.',
    stats: [
      { label: 'Data Loss', value: 'Zero' },
      { label: 'Resume Time', value: '< 1 sec' },
    ],
  },
];

// Depiction component for Step 1 - Terminal
function TerminalDepiction({ isActive }) {
  return <AnimatedTerminal isVisible={isActive} delay={200} />;
}

// Depiction component for Step 2 - Detect/Suggest/Fix flow
function DetectFixDepiction({ isActive }) {
  return (
    <div className={`glass-card copper-glow p-6 flex flex-col hover-scale transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-[9px] font-mono text-red-400">1</div>
            <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold">Detected</span>
          </div>
          <div className="w-8 h-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center text-[9px] font-mono text-yellow-400">2</div>
            <span className="text-[9px] uppercase tracking-widest text-yellow-400 font-bold">Suggested</span>
          </div>
          <div className="w-8 h-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-[9px] font-mono text-green-400">3</div>
            <span className="text-[9px] uppercase tracking-widest text-green-400 font-bold">Fixed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1">
        <div className="bg-black/50 border border-red-500/30 p-4 rounded flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-red-400/80 mb-3 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">error</span> Failure
          </span>
          <div className="font-mono text-[10px] text-white/60 flex-1 space-y-1">
            <div><span className="text-red-400">×</span> Step 3 failed</div>
            <div><span className="text-red-400">×</span> send_email()</div>
            <div className="text-white/30 mt-2">Invalid recipient</div>
          </div>
        </div>
        <div className="bg-black/50 border border-yellow-500/30 p-4 rounded flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-yellow-400/80 mb-3 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">lightbulb</span> Suggested
          </span>
          <div className="font-mono text-[10px] text-white/60 flex-1 space-y-1">
            <div><span className="text-yellow-400">→</span> Validate email</div>
            <div><span className="text-yellow-400">→</span> Use user lookup</div>
            <div className="text-white/30 mt-2">AI-generated fix</div>
          </div>
        </div>
        <div className="bg-black/50 border border-green-500/30 p-4 rounded flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-green-400/80 mb-3 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> Fixed
          </span>
          <div className="font-mono text-[10px] text-white/60 flex-1 space-y-1">
            <div><span className="text-green-400">✓</span> Fix applied</div>
            <div><span className="text-green-400">✓</span> Step 3 passed</div>
            <div className="text-green-400/60 mt-2">Ready to resume</div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="size-2 bg-green-500 rounded-full"></span>
          <span className="text-[10px] font-mono text-green-400">FIX APPLIED — Ready to resume from step 3</span>
        </div>
        <div className="text-[9px] font-mono text-white/30">14:02:19</div>
      </div>
    </div>
  );
}

// Depiction component for Step 3 - Resume comparison
function ResumeDepiction({ isActive }) {
  return (
    <div className={`glass-card relative overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-xl shadow-black/20 hover-scale transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="grid grid-cols-2 gap-0 relative">
        <div className="p-6 flex flex-col bg-transparent border-r border-white/10">
          <div className="flex items-center gap-2 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-1">Failed State</div>
              <div className="text-[10px] font-mono text-white/30">Step 03</div>
            </div>
          </div>
          <div className="font-mono text-[11px] space-y-2 flex-1">
            <div className="flex items-start gap-2">
              <span className="text-red-400/80 mt-1">-</span>
              <div className="flex-1">
                <span className="text-white/50">session_id:</span>
                <span className="text-white/80 ml-2">"AC-9912"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400/80 mt-1">-</span>
              <div className="flex-1">
                <span className="text-white/50">status:</span>
                <span className="text-red-400 ml-2 font-semibold">"ERROR"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400/80 mt-1">-</span>
              <div className="flex-1">
                <span className="text-white/50">tool:</span>
                <span className="text-white/80 ml-2">"send_email"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400/80 mt-1">-</span>
              <div className="flex-1">
                <span className="text-white/50">error:</span>
                <span className="text-red-400 ml-2">"Invalid recipient"</span>
              </div>
            </div>
            <div className="pt-4 mt-4">
              <div className="text-[10px] text-white/40 italic font-mono">// Hallucinated email address</div>
            </div>
          </div>
          <div className="text-[10px] text-white/20 font-mono mt-4">Timestamp: 14:02:16</div>
        </div>
        <div className="p-6 flex flex-col bg-transparent">
          <div className="flex items-center gap-2 mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-green-400 font-semibold mb-1">Corrected State</div>
              <div className="text-[10px] font-mono text-white/30">Resumed</div>
            </div>
          </div>
          <div className="font-mono text-[11px] space-y-2 flex-1">
            <div className="flex items-start gap-2">
              <span className="text-green-400/80 mt-1">+</span>
              <div className="flex-1">
                <span className="text-white/50">session_id:</span>
                <span className="text-white/80 ml-2">"AC-9912"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400/80 mt-1">+</span>
              <div className="flex-1">
                <span className="text-white/50">status:</span>
                <span className="text-green-400 ml-2 font-semibold">"RESUMED"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400/80 mt-1">+</span>
              <div className="flex-1">
                <span className="text-white/50">tool:</span>
                <span className="text-white/80 ml-2">"send_email"</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400/80 mt-1">+</span>
              <div className="flex-1">
                <span className="text-white/50">result:</span>
                <span className="text-green-400 ml-2 font-semibold">"Success"</span>
              </div>
            </div>
            <div className="pt-4 mt-4">
              <div className="text-[10px] text-white/40 italic font-mono">// Fix applied, execution continued</div>
            </div>
          </div>
          <div className="text-[10px] text-white/20 font-mono mt-4">Timestamp: 14:02:19</div>
        </div>
      </div>
    </div>
  );
}

const depictions = [TerminalDepiction, DetectFixDepiction, ResumeDepiction];

export default function ScrollyFeatureSection() {
  const [containerRef, { currentStep, isPinned, phase }] = useScrollyTelling(3, {
    scrollPerStep: window.innerHeight * 0.7,
  });

  const feature = features[currentStep];
  const DepictionComponent = depictions[currentStep];

  // Calculate position based on phase
  const getPositionStyle = () => {
    if (phase === 'pinned') {
      return { position: 'fixed', top: 0, bottom: 'auto' };
    }
    if (phase === 'after') {
      return { position: 'absolute', top: 'auto', bottom: 0 };
    }
    // phase === 'before'
    return { position: 'absolute', top: 0, bottom: 'auto' };
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${100 + 3 * 70}vh` }} // Container height = viewport + scroll distance
    >
      {/* Sticky viewport */}
      <div
        className="h-screen flex items-center px-12 border-b border-hairline bg-charcoal z-10 left-0 right-0"
        style={getPositionStyle()}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-16 items-center w-full">
          {/* Left side - Text content */}
          <div className="col-span-12 lg:col-span-5 relative min-h-[400px]">
            {features.map((f, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: currentStep === index ? 1 : 0,
                  transform: `translateY(${(index - currentStep) * 20}px)`,
                  pointerEvents: currentStep === index ? 'auto' : 'none',
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-copper font-mono text-sm font-bold">{f.number}.</span>
                  <div className="h-px w-12 bg-copper/30"></div>
                  <span className="text-[11px] uppercase tracking-[0.4em] font-bold">{f.label}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">{f.title}</h2>
                <p className="text-white/60 text-lg leading-relaxed mb-10">{f.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {f.stats.map((stat, sIndex) => (
                    <div key={sIndex} className="p-4 glass-card-simple">
                      <div className="text-[9px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</div>
                      <div className="text-xl font-mono text-copper">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Depictions */}
          <div className="col-span-12 lg:col-span-7 relative min-h-[400px]">
            {depictions.map((Depiction, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: currentStep === index ? 1 : 0,
                  transform: `translateX(${(index - currentStep) * 30}px)`,
                  pointerEvents: currentStep === index ? 'auto' : 'none',
                }}
              >
                <Depiction isActive={currentStep === index} />
              </div>
            ))}
          </div>
        </div>

        {/* Step indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-2 h-8 rounded-full transition-all duration-300 ${
                currentStep === step ? 'bg-copper' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[9px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-6 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
