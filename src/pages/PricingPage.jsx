import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { FocusCards } from '../components/FocusCards';

// Feature categories with visual data
const featureCategories = {
  core: {
    label: 'Core Features',
    icon: '⚡',
    features: [
      { name: 'Agent Executions', free: '500/mo', developer: '2,500/mo', pro: '25,000/mo', enterprise: 'Unlimited', visual: 'bar', values: [5, 20, 50, 100] },
      { name: 'Trace Retention', free: '7 days', developer: '14 days', pro: '60 days', enterprise: 'Custom', visual: 'bar', values: [10, 20, 60, 100] },
      { name: 'Checkpoints', free: true, developer: true, pro: true, enterprise: true },
      { name: 'Basic Tracing', free: true, developer: true, pro: true, enterprise: true },
    ]
  },
  analytics: {
    label: 'Analytics & Insights',
    icon: '📊',
    features: [
      { name: 'Performance Dashboard', free: false, developer: false, pro: true, enterprise: true },
      { name: 'Failure Analytics', free: false, developer: false, pro: true, enterprise: true },
      { name: 'Topic Clustering', free: false, developer: false, pro: true, enterprise: true },
      { name: 'Custom Reports', free: false, developer: false, pro: false, enterprise: true },
    ]
  },
  recovery: {
    label: 'Recovery & Fixes',
    icon: '🔧',
    features: [
      { name: 'Silent Failure Detection', free: false, developer: false, pro: true, enterprise: true },
      { name: 'AI Fix Suggestions', free: false, developer: false, pro: true, enterprise: true },
      { name: 'Auto-Apply Fixes', free: false, developer: false, pro: false, enterprise: true },
      { name: 'Replay & Resume', free: false, developer: false, pro: true, enterprise: true },
    ]
  },
  team: {
    label: 'Team & Support',
    icon: '👥',
    features: [
      { name: 'Team Members', free: '1', developer: '1', pro: '5', enterprise: 'Unlimited', visual: 'dots', values: [1, 1, 5, 10] },
      { name: 'SSO Login', free: false, developer: false, pro: false, enterprise: true },
      { name: 'Slack Integration', free: false, developer: false, pro: true, enterprise: true },
      { name: 'Support Level', free: 'Community', developer: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
    ]
  },
};

// Visual components for table
function FeatureValue({ value, plan }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex justify-center">
        <div className={`size-5 rounded-full flex items-center justify-center ${plan === 'pro' ? 'bg-copper/20' : 'bg-white/10'}`}>
          <span className={`text-xs ${plan === 'pro' ? 'text-copper' : 'text-white/60'}`}>✓</span>
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="size-5 rounded-full bg-white/5 flex items-center justify-center">
          <span className="text-white/20 text-xs">—</span>
        </div>
      </div>
    );
  }
  return (
    <span className={`text-[12px] ${plan === 'pro' ? 'text-white/80 font-medium' : 'text-white/40'}`}>
      {value}
    </span>
  );
}

function VisualBar({ values, plan }) {
  const planIndex = plan === 'free' ? 0 : plan === 'developer' ? 1 : plan === 'pro' ? 2 : 3;
  const value = values[planIndex];
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${plan === 'pro' ? 'bg-copper' : 'bg-white/30'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function CategoryHeader({ category, isOpen, onToggle, data }) {
  const featureCount = data.features.length;

  return (
    <button
      onClick={onToggle}
      className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center p-4 bg-panel/50 hover:bg-panel transition-colors border-b border-white/[0.04]"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg flex-shrink-0">{data.icon}</span>
        <span className="text-[13px] font-medium text-white/80 whitespace-nowrap">{data.label}</span>
        <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded whitespace-nowrap">{featureCount} features</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-white/30 text-sm ml-2 flex-shrink-0"
        >
          ▼
        </motion.span>
      </div>
      {/* Mini visual summary for each plan */}
      <div className="flex justify-center">
        <div className="flex gap-0.5">
          {data.features.map((f, i) => (
            <div key={i} className={`size-1.5 rounded-full ${f.free ? 'bg-white/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-0.5">
          {data.features.map((f, i) => (
            <div key={i} className={`size-1.5 rounded-full ${f.developer ? 'bg-white/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-0.5">
          {data.features.map((f, i) => (
            <div key={i} className={`size-1.5 rounded-full ${f.pro ? 'bg-copper' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-0.5">
          {data.features.map((f, i) => (
            <div key={i} className={`size-1.5 rounded-full ${f.enterprise ? 'bg-white/40' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
    </button>
  );
}

export default function PricingPage() {
  const [comparisonRef, comparisonVisible] = useScrollAnimation({ threshold: 0.2 });
  const [openCategories, setOpenCategories] = useState(['core', 'analytics']);

  const toggleCategory = (key) => {
    setOpenCategories(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="pt-20 page-enter">
      {/* Section 1: Pricing */}
      <section className="px-12 pt-20 pb-32">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 animate-fade-in-up">What's your uptime worth?</h1>
            <p className="text-white/40 text-lg animate-fade-in-up stagger-1">Start free. Scale when ready.</p>
          </div>

          {/* Pricing Cards */}
          <FocusCards>
            {/* Free Tier */}
            <div className="pricing-card rounded-xl p-6 flex flex-col h-full animate-fade-in-up stagger-2">
              <div className="mb-5">
                <h3 className="text-xs font-[500] text-white/40 uppercase tracking-widest mb-3">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-[600]">$0</span>
                  <span className="text-white/30 text-sm">/month</span>
                </div>
              </div>

              <Link to="/auth" className="w-full py-2.5 border border-white/[0.08] text-white/70 text-[10px] font-[500] uppercase tracking-widest rounded-lg hover:border-white/20 transition-all mb-6 text-center block">
                Get Started
              </Link>

              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span><span className="text-white/80">500 agent runs</span> / month</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Core observability</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>7-day data retention</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>1 seat</span>
                </li>
              </ul>
            </div>

            {/* Developer Tier */}
            <div className="pricing-card rounded-xl p-6 flex flex-col h-full animate-fade-in-up stagger-3">
              <div className="mb-5">
                <h3 className="text-xs font-[500] text-white/40 uppercase tracking-widest mb-3">Developer</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-[600]">$39</span>
                  <span className="text-white/30 text-sm">/month</span>
                </div>
              </div>

              <Link to="/auth" className="w-full py-2.5 border border-white/[0.08] text-white/70 text-[10px] font-[500] uppercase tracking-widest rounded-lg hover:border-white/20 transition-all mb-6 text-center block">
                7d Free Trial
              </Link>

              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span><span className="text-white/80">2,500 agent runs</span> / month</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Core observability</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Search + filters</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>User feedback</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Local-first mode</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>14-day data retention</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>1 seat</span>
                </li>
              </ul>
            </div>

            {/* Pro Tier */}
            <div className="pricing-card-pro rounded-xl p-6 flex flex-col h-full relative animate-fade-in-up stagger-4">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-copper text-black text-[9px] font-[600] uppercase tracking-wider rounded">
                Popular
              </div>

              <div className="mb-5">
                <h3 className="text-xs font-[500] text-copper uppercase tracking-widest mb-3">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-[600]">$299</span>
                  <span className="text-white/30 text-sm">/month</span>
                </div>
              </div>

              <Link to="/auth" className="w-full py-2.5 bg-copper text-black text-[10px] font-[600] uppercase tracking-widest rounded-lg hover:bg-white transition-all mb-6 text-center block">
                Get Started
              </Link>

              <p className="text-[11px] text-white/40 mb-4">Everything in Developer, plus:</p>

              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span><span className="text-white/90">25,000 agent runs</span> / month</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Silent failure detection</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Topic Clustering</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>60-day data retention</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Up to 5 seats</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/70">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Slack support</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Tier */}
            <div className="pricing-card rounded-xl p-6 flex flex-col h-full animate-fade-in-up stagger-5">
              <div className="mb-5">
                <h3 className="text-xs font-[500] text-white/40 uppercase tracking-widest mb-3">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-[600]">Custom</span>
                </div>
              </div>

              <Link to="/contact" className="w-full py-2.5 border border-white/[0.08] text-white/70 text-[10px] font-[500] uppercase tracking-widest rounded-lg hover:border-white/20 transition-all mb-6 text-center block">
                Contact Sales
              </Link>

              <p className="text-[11px] text-white/40 mb-4">Everything in Pro, plus:</p>

              <ul className="space-y-3 flex-1">
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Unlimited seats</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Custom rate limits</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Custom data retention</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>SSO login</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>SLA guarantees</span>
                </li>
                <li className="flex items-start gap-2.5 text-[12px] text-white/60">
                  <span className="text-copper text-xs mt-0.5">✓</span>
                  <span>Prioritized support</span>
                </li>
              </ul>
            </div>
          </FocusCards>
        </div>
      </section>

      {/* Section 2: Interactive Comparison */}
      <section ref={comparisonRef} className="px-12 py-32 border-t border-hairline">
        <div className="max-w-5xl mx-auto w-full">
          <div className={`text-center mb-12 transition-all duration-700 ${comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl font-[600] tracking-tight text-white/90 mb-3">Feature breakdown</h2>
            <p className="text-white/40 text-sm">Click categories to expand details</p>
          </div>

          {/* Visual Summary Cards */}
          <div className={`grid grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-100 ${comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-panel/30 border border-white/5 rounded-xl p-5">
              <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Free</div>
              <div className="flex items-end gap-1 h-12 mb-3">
                <div className="w-full bg-white/10 rounded" style={{ height: '25%' }}></div>
              </div>
              <div className="text-[10px] text-white/40">4 of 16 features</div>
            </div>
            <div className="bg-panel/30 border border-white/5 rounded-xl p-5">
              <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Developer</div>
              <div className="flex items-end gap-1 h-12 mb-3">
                <div className="w-full bg-white/20 rounded" style={{ height: '35%' }}></div>
              </div>
              <div className="text-[10px] text-white/40">6 of 16 features</div>
            </div>
            <div className="bg-copper/5 border border-copper/20 rounded-xl p-5 relative">
              <div className="absolute -top-2 right-4 px-2 py-0.5 bg-copper text-black text-[8px] font-bold uppercase rounded">Best Value</div>
              <div className="text-[11px] uppercase tracking-widest text-copper mb-3">Pro</div>
              <div className="flex items-end gap-1 h-12 mb-3">
                <div className="w-full bg-copper rounded" style={{ height: '80%' }}></div>
              </div>
              <div className="text-[10px] text-copper/60">13 of 16 features</div>
            </div>
            <div className="bg-panel/30 border border-white/5 rounded-xl p-5">
              <div className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Enterprise</div>
              <div className="flex items-end gap-1 h-12 mb-3">
                <div className="w-full bg-white/30 rounded" style={{ height: '100%' }}></div>
              </div>
              <div className="text-[10px] text-white/40">All 16 features</div>
            </div>
          </div>

          {/* Interactive Category Table */}
          <div className={`border border-white/[0.04] rounded-xl overflow-hidden transition-all duration-700 delay-200 ${comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Sticky Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-charcoal border-b border-white/[0.06] sticky top-0 z-10">
              <div className="p-4 text-[11px] text-white/40 uppercase tracking-widest">Category</div>
              <div className="p-4 text-[11px] text-white/40 uppercase tracking-widest text-center">Free</div>
              <div className="p-4 text-[11px] text-white/40 uppercase tracking-widest text-center">Developer</div>
              <div className="p-4 text-[11px] text-copper uppercase tracking-widest text-center font-medium">Pro</div>
              <div className="p-4 text-[11px] text-white/40 uppercase tracking-widest text-center">Enterprise</div>
            </div>

            {/* Category Sections */}
            {Object.entries(featureCategories).map(([key, data]) => (
              <div key={key}>
                <CategoryHeader
                  category={key}
                  data={data}
                  isOpen={openCategories.includes(key)}
                  onToggle={() => toggleCategory(key)}
                />
                <AnimatePresence>
                  {openCategories.includes(key) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {data.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="p-4 pl-12 text-[12px] text-white/50">{feature.name}</div>
                          <div className="p-4 text-center">
                            {feature.visual === 'bar' ? (
                              <div className="px-2">
                                <VisualBar values={feature.values} plan="free" />
                                <div className="text-[10px] text-white/30 mt-1">{feature.free}</div>
                              </div>
                            ) : (
                              <FeatureValue value={feature.free} plan="free" />
                            )}
                          </div>
                          <div className="p-4 text-center">
                            {feature.visual === 'bar' ? (
                              <div className="px-2">
                                <VisualBar values={feature.values} plan="developer" />
                                <div className="text-[10px] text-white/30 mt-1">{feature.developer}</div>
                              </div>
                            ) : (
                              <FeatureValue value={feature.developer} plan="developer" />
                            )}
                          </div>
                          <div className="p-4 text-center bg-copper/[0.02]">
                            {feature.visual === 'bar' ? (
                              <div className="px-2">
                                <VisualBar values={feature.values} plan="pro" />
                                <div className="text-[10px] text-copper/80 mt-1 font-medium">{feature.pro}</div>
                              </div>
                            ) : (
                              <FeatureValue value={feature.pro} plan="pro" />
                            )}
                          </div>
                          <div className="p-4 text-center">
                            {feature.visual === 'bar' ? (
                              <div className="px-2">
                                <VisualBar values={feature.values} plan="enterprise" />
                                <div className="text-[10px] text-white/30 mt-1">{feature.enterprise}</div>
                              </div>
                            ) : (
                              <FeatureValue value={feature.enterprise} plan="enterprise" />
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 flex items-center justify-between gap-6 p-6 bg-panel/30 rounded-xl border border-white/5">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">Need help choosing?</p>
              <p className="text-white/40 text-xs">Our team can help you find the perfect plan for your needs.</p>
            </div>
            <Link to="/contact" className="px-6 py-3 bg-copper text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
