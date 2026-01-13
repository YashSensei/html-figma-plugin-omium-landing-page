import { useState, useEffect } from 'react';

const terminalLines = [
  { time: '14:02:11', type: 'checkpoint', label: '[CHECKPOINT]', content: 'State saved → step_01' },
  { time: '14:02:11', type: 'prompt', label: '[PROMPT]', content: '"Process order #4821 for user"' },
  { time: '14:02:12', type: 'tool', label: '[TOOL]', content: 'get_user_data() → 124ms' },
  { time: '14:02:12', type: 'checkpoint', label: '[CHECKPOINT]', content: 'State saved → step_02' },
  { time: '14:02:13', type: 'tool', label: '[TOOL]', content: 'validate_payment() → 89ms' },
  { time: '14:02:14', type: 'decision', label: '[DECISION]', content: 'Route to fulfillment agent' },
];

const getTypeColor = (type) => {
  switch (type) {
    case 'checkpoint':
      return 'text-green-400';
    case 'prompt':
    case 'tool':
      return 'text-white/40';
    case 'decision':
      return 'text-copper';
    default:
      return 'text-white/40';
  }
};

export default function AnimatedTerminal({ isVisible, delay = 500 }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Reset animation when becoming invisible
  useEffect(() => {
    if (!isVisible) {
      setVisibleLines([]);
      setCurrentLineIndex(0);
      setIsTyping(false);
      setCurrentText('');
      setHasStarted(false);
    }
  }, [isVisible]);

  // Start animation when visible
  useEffect(() => {
    if (isVisible && !hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }
  }, [isVisible, hasStarted, delay]);

  // Type out each line
  useEffect(() => {
    if (!hasStarted || currentLineIndex >= terminalLines.length) return;

    const line = terminalLines[currentLineIndex];
    const fullText = line.content;

    if (!isTyping) {
      setIsTyping(true);
      setCurrentText('');
    }

    if (currentText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, 20 + Math.random() * 30); // Variable typing speed for realism
      return () => clearTimeout(timer);
    } else {
      // Line complete, add to visible lines and move to next
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, content: fullText }]);
        setCurrentLineIndex(prev => prev + 1);
        setIsTyping(false);
        setCurrentText('');
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, currentLineIndex, currentText, isTyping]);

  const currentLine = terminalLines[currentLineIndex];

  return (
    <div className="glass-card copper-glow p-1 aspect-video relative overflow-hidden group">
      <div className="absolute inset-0 bg-[#080808] p-6 flex flex-col font-mono text-[11px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${hasStarted ? 'bg-copper animate-pulse' : 'bg-copper/50'}`}></span>
            <span className="uppercase tracking-widest font-bold">Agent Trace</span>
          </div>
          <span className="text-white/30 uppercase">Workflow: order-processing</span>
        </div>
        <div className="flex-1 overflow-y-auto terminal-scroll space-y-2 text-white/70">
          {/* Completed lines */}
          {visibleLines.map((line, index) => (
            <div key={index} className="flex gap-4 animate-fade-in">
              <span className="text-white/20">{line.time}</span>
              <span className={getTypeColor(line.type)}>{line.label}</span>
              <span>{line.content}</span>
            </div>
          ))}

          {/* Currently typing line */}
          {isTyping && currentLine && (
            <div className="flex gap-4">
              <span className="text-white/20">{currentLine.time}</span>
              <span className={getTypeColor(currentLine.type)}>{currentLine.label}</span>
              <span>
                {currentText}
                <span className="text-copper cursor-blink">|</span>
              </span>
            </div>
          )}

          {/* Blinking cursor at the end */}
          {currentLineIndex >= terminalLines.length && (
            <div className="flex gap-4">
              <span className="text-white/20">14:02:14</span>
              <span className="text-copper cursor-blink">_</span>
            </div>
          )}

          {/* Placeholder when not started */}
          {!hasStarted && (
            <div className="flex gap-4 text-white/20">
              <span>Waiting for trace...</span>
              <span className="cursor-blink">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
