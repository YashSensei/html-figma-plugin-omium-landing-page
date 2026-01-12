import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  // Page with animations
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-12 pt-20 page-enter">
        <div className="max-w-md text-center animate-scale-in">
          <div className="size-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6 animate-pop-in">
            <span className="material-symbols-outlined text-green-400 text-3xl">check_circle</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank you!</h1>
          <p className="text-white/50 mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <Link to="/" className="btn-hover px-6 py-3 bg-copper text-black text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 page-enter">
      <section className="px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-16">
            {/* Left side - Info */}
            <div className="col-span-12 lg:col-span-5 animate-fade-in-left">
              <div className="text-[10px] font-mono text-copper uppercase tracking-[0.4em] mb-4">Get in Touch</div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Book a demo<br/><span className="italic font-serif text-white/70">with our team.</span>
              </h1>
              <p className="text-white/50 leading-relaxed mb-12">
                See how Omium can help you debug, monitor, and recover your AI agents in production. Our team will walk you through the platform and answer any questions.
              </p>

              {/* What to expect */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">What to expect</h3>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-copper text-sm">schedule</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">30-minute walkthrough</div>
                    <p className="text-white/40 text-sm">Personalized demo tailored to your use case</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-copper text-sm">code</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Technical deep-dive</div>
                    <p className="text-white/40 text-sm">See how Omium integrates with your stack</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="size-8 rounded-full bg-copper/10 border border-copper/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-copper text-sm">help</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Q&A session</div>
                    <p className="text-white/40 text-sm">Get answers to all your questions</p>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-12 pt-8 border-t border-hairline">
                <p className="text-white/40 text-sm mb-4">Prefer email?</p>
                <a href="mailto:hello@omium.ai" className="text-copper hover:text-white transition-colors">
                  hello@omium.ai
                </a>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="col-span-12 lg:col-span-7 animate-fade-in-right stagger-2">
              <div className="glass-card p-8 lg:p-10 hover-glow transition-all duration-500">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                        First name *
                      </label>
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
                      <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                        Last name *
                      </label>
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
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                      Work email *
                    </label>
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
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Acme Inc."
                      className="input-field"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                      Team size
                    </label>
                    <select
                      name="teamSize"
                      className="input-field appearance-none cursor-pointer"
                      value={formData.teamSize}
                      onChange={handleChange}
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 engineers</option>
                      <option value="6-20">6-20 engineers</option>
                      <option value="21-50">21-50 engineers</option>
                      <option value="51-200">51-200 engineers</option>
                      <option value="200+">200+ engineers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-[500] text-white/60 uppercase tracking-wider mb-2">
                      Tell us about your use case
                    </label>
                    <textarea
                      name="message"
                      placeholder="What AI agents are you building? What challenges are you facing?"
                      className="input-field min-h-[120px] resize-none"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-copper text-black text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all"
                  >
                    Request Demo
                  </button>

                  <p className="text-center text-xs text-white/30">
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-copper hover:text-white">Privacy Policy</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
