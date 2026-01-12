import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  // Page transition class
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.agreeTerms) {
          setError('Please agree to the Terms of Service and Privacy Policy');
          return;
        }
        await signup(formData.firstName, formData.lastName, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex page-enter">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-copper/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="relative z-10 flex items-center gap-2 mt-20 animate-fade-in-down">
          <div className="size-5 bg-copper"></div>
          <span className="text-lg font-[600] tracking-tighter uppercase font-inter">Omium<span className="text-copper">.</span></span>
        </div>

        <div className="relative z-10 max-w-md animate-fade-in-left stagger-1">
          <h1 className="text-4xl font-bold tracking-tight leading-tight mb-6 text-[#EAEAEA]">
            Make AI failures<br/><span className="italic font-serif text-[#D0D0D0]">visible.</span>
          </h1>
          <p className="text-white/50 leading-relaxed mb-8">
            Observability and reliability for production AI agents. Know exactly why your agents fail and recover without re-running everything.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-copper text-lg">check_circle</span>
              <span className="text-sm text-white/70">Execution checkpointing at every step</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-copper text-lg">check_circle</span>
              <span className="text-sm text-white/70">AI-powered fix suggestions</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-copper text-lg">check_circle</span>
              <span className="text-sm text-white/70">Resume from any checkpoint</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 animate-fade-in-up stagger-3">
          <p className="text-white/40 text-sm italic mb-3">"We went from re-running entire workflows to resuming from exact failure points."</p>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-gradient-to-br from-copper/40 to-black border border-copper/20"></div>
            <div>
              <div className="text-xs font-[500]">Julian Black</div>
              <div className="text-[10px] text-white/40">VP Eng, Cortex AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 border-l border-hairline relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-copper/[0.03] rounded-full blur-[100px] pointer-events-none"></div>
        <div className="w-full max-w-md relative z-10 animate-fade-in-right">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-12 mt-20">
            <div className="size-5 bg-copper"></div>
            <span className="text-lg font-[600] tracking-tighter uppercase font-inter">Omium<span className="text-copper">.</span></span>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg mb-8">
            <button
              className={`flex-1 py-2.5 text-sm font-[500] rounded-md transition-all ${isLogin ? 'bg-copper text-black' : 'text-white/60 hover:text-white'}`}
              onClick={() => setIsLogin(true)}
            >
              Log in
            </button>
            <button
              className={`flex-1 py-2.5 text-sm font-[500] rounded-md transition-all ${!isLogin ? 'bg-copper text-black' : 'text-white/60 hover:text-white'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {isLogin ? (
            /* Login Form */
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-[600] tracking-tight mb-2 text-white">Welcome back</h2>
                <p className="text-white/50 text-sm">Enter your credentials to access your account</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="size-4 rounded border-white/20 bg-white/5 text-copper focus:ring-copper/30"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="text-sm text-white/50">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-copper hover:text-white transition-colors">Forgot password?</a>
                </div>

                <button type="submit" className="w-full py-3.5 bg-copper text-black text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all mt-8">
                  Log in
                </button>
              </form>
            </div>
          ) : (
            /* Signup Form */
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-[600] tracking-tight mb-2 text-white">Create your account</h2>
                <p className="text-white/50 text-sm">Start monitoring your AI agents in minutes</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="input-field"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="input-field"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">Work email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 8 characters"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer pt-4">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="size-4 rounded border-white/20 bg-white/5 text-copper focus:ring-copper/30 mt-0.5"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <span className="text-sm text-white/50">I agree to the <a href="#" className="text-copper hover:text-white">Terms of Service</a> and <a href="#" className="text-copper hover:text-white">Privacy Policy</a></span>
                </label>

                <button type="submit" className="w-full py-3.5 bg-copper text-black text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all mt-8">
                  Create account
                </button>
              </form>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[11px] text-white/40 tracking-wide">Trusted by engineers</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-[#0E0E0E] border border-white/[0.08] rounded-lg text-[13px] font-[500] text-white/60 hover:border-white/15 hover:bg-[#141414] hover:text-white/80 transition-all">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-[#0E0E0E] border border-white/[0.08] rounded-lg text-[13px] font-[500] text-white/60 hover:border-white/15 hover:bg-[#141414] hover:text-white/80 transition-all">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-xs text-white/30 mt-12">
            © 2025 Omium. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
