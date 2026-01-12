import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-12 px-12 border-t border-hairline bg-[#050505] flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-4 bg-copper"></div>
          <span className="text-sm font-bold tracking-tighter uppercase font-inter">Omium.</span>
        </Link>
        <div className="flex gap-8 text-[9px] font-mono uppercase tracking-widest text-white/30">
          <a
            href="https://docs.omium.ai/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-copper transition-colors"
          >
            Docs
          </a>
          <Link to="/privacy" className="hover:text-copper transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-copper transition-colors">
            Terms
          </Link>
        </div>
      </div>
      <div className="text-[9px] font-mono uppercase tracking-widest text-white/20">
        © 2025 Omium. All Rights Reserved.
      </div>
    </footer>
  );
}
