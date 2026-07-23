import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    // Base Canvas: Warm, rich off-white premium background
    <div className="min-h-screen bg-[#FFFDF7] text-[#2A2421] antialiased selection:bg-[#AD715D]/10 font-sans selection:text-[#AD715D]">
      
      {/* 1. FIXED NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 border-b border-[#EAEAE7]/50 bg-[#FFFDF7]/90 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          {/* Logo with high-end editorial serif look */}
          <Link href="/" className="text-2xl font-semibold tracking-tight font-serif select-none cursor-pointer text-[#AD715D]">
            VOUCHO
          </Link>
          
          {/* Main Navigation Tabs */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#1A202C]/70">
            <Link href="#features" className="hover:text-[#AD715D] transition-colors duration-200">Features</Link>
            <Link href="#how-it-works" className="hover:text-[#AD715D] transition-colors duration-200">How It Works</Link>
            <Link href="#pricing" className="hover:text-[#AD715D] transition-colors duration-200">Pricing</Link>
            <Link href="#faq" className="hover:text-[#AD715D] transition-colors duration-200">FAQ</Link>
          </div>
          
          {/* Sharp, commanding primary action */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#2A2421]/70 hover:text-[#AD715D] transition-colors duration-200">
              Login
            </Link>
            <Link href="https://wa.me/923001234567?text=Hello%2C%20I'd%20like%20to%20book%20a%20Voucho%20demo." target="_blank" className="bg-[#AD715D] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#AD715D]/90 transition-all duration-200 shadow-sm">
              Book a Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-32 animate-in fade-in duration-1000 slide-in-from-bottom-4">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Copy (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#AD715D]/60 uppercase mb-4">
              REPUTATION ENGINEERING
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#2A2421] leading-[1.1] mb-6">
              Your reputation, <span className="relative inline-block">EFFORTLESS.<span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#AD715D]/30 rounded-full"></span></span>
            </h1>
            <p className="text-lg text-[#2A2421]/70 max-w-xl leading-relaxed mb-10 font-normal">
              Automate customer feedback, compound your Google reviews organically, and manage your absolute reputation through a beautiful, seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="inline-block text-center bg-[#AD715D] text-white text-sm font-semibold tracking-wider px-8 py-4 rounded-sm hover:bg-[#AD715D]/90 transition-all duration-200 shadow-md">
                REQUEST ACCESS
              </Link>
              <Link href="https://wa.me/923001234567?text=Hello%2C%20I'd%20like%20to%20book%20a%20Voucho%20private%20demo." target="_blank" className="inline-block text-center border border-[#AD715D] text-[#AD715D] text-sm font-medium px-8 py-4 rounded-sm hover:bg-[#FFFDF7] transition-all duration-200">
                BOOK PRIVATE DEMO
              </Link>
            </div>
          </div>

          {/* Hero Premium UI Mockups (Right) */}
          <div className="lg:col-span-6 relative flex flex-col gap-6 lg:pl-10 animate-in fade-in duration-1000 delay-300 slide-in-from-bottom-8">
            
            {/* Mockup Card 1: Google Review Growth */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#EAEAE7] p-8 max-w-md ml-auto w-full transition-all duration-300 transform hover:-translate-y-1"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.03)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1A202C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1A202C]">Google Review Growth</h4>
                    <p className="text-xs text-green-600 font-medium">128% Monthly Increase</p>
                  </div>
                </div>
              </div>
              {/* Minimal Line Chart Vector */}
              <div className="w-full h-24 pt-4 flex items-end">
                <svg className="w-full h-full text-[#1A202C]/20" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,25 Q15,22 30,18 T60,12 T90,5 L100,2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Mockup Card 3: Reputation Score */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#EAEAE7] p-6 max-w-md ml-auto mr-4 w-11/12 transition-all duration-300 transform hover:-translate-y-1"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.03)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold tracking-wider text-[#1A202C]/50 uppercase">Voucho Score</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-serif font-bold text-[#1A202C]">4.9</span>
                    <span className="text-sm text-[#1A202C]/60">/ 5.0</span>
                  </div>
                </div>
                <div className="flex gap-1 text-amber-500 text-lg">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
              <p className="text-[11px] text-[#1A202C]/50 mt-2 font-medium">Based on 542 real customer submissions this month</p>
            </div>

            {/* Mockup Card 2: Feedback Hub */}
            <div className="bg-[#FFFFFF] rounded-xl border border-[#EAEAE7] p-6 max-w-md mr-auto w-full transition-all duration-300 transform hover:-translate-y-1"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.03)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-sm">★</div>
                <span className="text-xs tracking-wider text-[#1A202C]/50 font-medium uppercase">Recent Feedback</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-[#FBFBFA] rounded border border-[#EAEAE7]/60 text-xs text-[#1A202C]/80 italic">
                  "Amazing service and unparalleled attention to detail!"
                </div>
                <div className="p-3 bg-[#FBFBFA] rounded border border-[#EAEAE7]/60 text-xs text-[#1A202C]/80 italic">
                  "The booking system was flawless, highly recommended."
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PROPOSITION AUDIENCE LINE */}
      <section className="border-y border-[#EAEAE7] bg-[#FFFFFF] py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs tracking-[0.2em] text-[#1A202C]/50 font-bold uppercase mb-0">
            DESIGNED FOR THE UNIQUE ENVIRONMENT OF PREMIUM SERVICE PROVIDERS
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-12 text-sm font-semibold tracking-widest text-[#1A202C]/40 uppercase">
            <span>SALONS</span>
            <span className="text-xs opacity-30">•</span>
            <span>CLINICS</span>
            <span className="text-xs opacity-30">•</span>
            <span>RESTAURANTS</span>
            <span className="text-xs opacity-30">•</span>
            <span>GYMS</span>
          </div>
        </div>
      </section>

      {/* 4. THREE-COLUMN CAPABILITY GRID */}
      <section id="features" className="py-32 bg-[#FBFBFA]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#1A202C]/50 uppercase">FEATURES</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A202C] mt-3">Reputation engineering, handled seamlessly.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-xl p-8 transition-all duration-300 hover:shadow-md animate-in fade-in duration-700 slide-in-from-bottom-4"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.02)' }}>
              <div className="w-12 h-12 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7] flex items-center justify-center mb-6 text-[#1A202C]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
              <h3 className="text-xl font-serif text-[#1A202C] mb-3">Automated Intercepts</h3>
              <p className="text-sm text-[#1A202C]/70 leading-relaxed">
                Gently collect exact customer insights immediately post-appointment before internal discrepancies scale out.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-xl p-8 transition-all duration-300 hover:shadow-md animate-in fade-in duration-700 delay-100 slide-in-from-bottom-4"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.02)' }}>
              <div className="w-12 h-12 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7] flex items-center justify-center mb-6 text-[#1A202C]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
              <h3 className="text-xl font-serif text-[#1A202C] mb-3">Review Compounding</h3>
              <p className="text-sm text-[#1A202C]/70 leading-relaxed">
                Direct public validation straight into your Google Business listing to accelerate organic visibility and local dominance.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-xl p-8 transition-all duration-300 hover:shadow-md animate-in fade-in duration-700 delay-200 slide-in-from-bottom-4"
                 style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.02)' }}>
              <div className="w-12 h-12 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7] flex items-center justify-center mb-6 text-[#1A202C]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
              </div>
              <h3 className="text-xl font-serif text-[#1A202C] mb-3">Central Analytics</h3>
              <p className="text-sm text-[#1A202C]/70 leading-relaxed">
                Track locations, operational teams, and structural score trendlines across a high-clarity unified interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-[#FFFFFF] border-t border-[#EAEAE7]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#1A202C]/50 uppercase">THE WORKFLOW</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1A202C] mt-3">Sophisticated tracking in three loops.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-5xl font-serif text-[#AD715D]/10 mb-4">01</div>
              <h4 className="text-lg font-medium text-[#2A2421] mb-2">NFC Tap Triggers</h4>
              <p className="text-sm text-[#2A2421]/60 max-w-xs">Customers tap premium physical standees or scan QR codes at your checkout counter.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-5xl font-serif text-[#1A202C]/10 mb-4">02</div>
              <h4 className="text-lg font-medium text-[#1A202C] mb-2">The Warm Intercept</h4>
              <p className="text-sm text-[#1A202C]/60 max-w-xs">Guests receive a beautifully branded micro-portal query optimized for speed.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="text-5xl font-serif text-[#1A202C]/10 mb-4">03</div>
              <h4 className="text-lg font-medium text-[#1A202C] mb-2">Google Propagation</h4>
              <p className="text-sm text-[#1A202C]/60 max-w-xs">Five-star scores are systematically routed directly to publish on your Google profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-32 bg-[#FBFBFA] border-t border-[#EAEAE7]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold tracking-widest text-[#1A202C]/50 uppercase">INVESTMENT</span>
            <h2 className="text-3xl font-serif text-[#1A202C] mt-3">Predictable pricing for growing brands.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Hardware Setup */}
            <div className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-xl p-8 flex flex-col justify-between" style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.01)' }}>
              <div>
                <h4 className="text-sm font-bold tracking-wider text-[#1A202C]/50 uppercase mb-2">Hardware Setup</h4>
                <div className="text-4xl font-serif text-[#1A202C] mb-2">Rs. 5,000</div>
                <p className="text-xs text-[#1A202C]/60 mb-4">One-time cost (includes 2 premium counter standees)</p>
                <p className="text-xs text-[#1A202C]/60 mb-6">Additional standees: Rs. 3,000 each</p>
              </div>
              <Link href="/register" className="w-full text-center bg-[#FBFBFA] hover:bg-[#EAEAE7] text-[#1A202C] border border-[#EAEAE7] text-sm font-medium py-3 rounded-sm transition-colors">Get Started</Link>
            </div>

            {/* Monthly Plan */}
            <div className="bg-[#FFFFFF] border-2 border-[#1A202C] rounded-xl p-8 flex flex-col justify-between relative" style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.04)' }}>
              <span className="absolute -top-3 right-6 bg-[#1A202C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">POPULAR</span>
              <h4 className="text-sm font-bold tracking-wider text-[#1A202C]/50 uppercase mb-2">Monthly</h4>
              <div className="text-4xl font-serif text-[#1A202C] mb-2">Rs. 2,000<span className="text-sm font-sans text-[#1A202C]/50"> / mo</span></div>
              <p className="text-xs text-[#1A202C]/60 mb-4">1-month free trial included</p>
              <p className="text-sm text-[#1A202C]/60 mb-6">Billed monthly after trial period</p>
              <Link href="/register" className="w-full text-center bg-[#1A202C] hover:bg-[#1A202C]/90 text-white text-sm font-medium py-3 rounded-sm transition-colors">Start Free Trial</Link>
            </div>

            {/* Yearly Plan */}
            <div className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-xl p-8 flex flex-col justify-between" style={{ boxShadow: '0 20px 40px rgba(26, 32, 44, 0.01)' }}>
              <div>
                <h4 className="text-sm font-bold tracking-wider text-[#1A202C]/50 uppercase mb-2">Yearly</h4>
                <div className="text-4xl font-serif text-[#1A202C] mb-2">Rs. 18,000</div>
                <p className="text-xs text-[#1A202C]/60 mb-4">Breaks down to Rs. 1,500 / mo</p>
                <p className="text-sm text-[#1A202C]/60 mb-6">Upfront yearly commitment</p>
              </div>
              <Link href="/register" className="w-full text-center bg-[#FBFBFA] hover:bg-[#EAEAE7] text-[#1A202C] border border-[#EAEAE7] text-sm font-medium py-3 rounded-sm transition-colors">Save 25%</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMALIST FAQ ACCORDION SECTION */}
      <section id="faq" className="py-32 bg-[#FFFFFF] border-t border-[#EAEAE7]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-[#1A202C]/50 uppercase">ANSWERS</span>
            <h2 className="text-3xl font-serif text-[#1A202C] mt-3">Frequently Inquired</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How exactly does it integrate with my scheduling software?", a: "Voucho safely interfaces via secure webhooks and API layers across classic hospitality, clinic management, and standard scheduling applications automatically." },
              { q: "Can we handle negative critiques internally?", a: "Yes. Low ratings are funneled into private internal resolution loops, while high ratings are automatically redirected to your Google Business profile." },
              { q: "Is there setup overhead?", a: "None. Our 5-minute self-serve onboarding flow lets you launch instantly. Your physical NFC standees are shipped the same business day." }
            ].map((faq, index) => (
              <div key={index} className="bg-[#FFFFFF] border border-[#EAEAE7] rounded-lg p-6">
                <h4 className="text-base font-medium text-[#1A202C] mb-2">{faq.q}</h4>
                <p className="text-sm text-[#1A202C]/60 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PREMIUM INVITATION CLOSING CTA */}
      <section className="bg-[#1A202C] text-white py-28 text-center relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight mb-6">
            Ready to secure absolute domain authority?
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Elevate your local visual footprint. Deploy Voucho's premium reputation pipeline across your enterprise locations today.
          </p>
          <Link href="https://wa.me/923001234567?text=Hello%2C%20I'd%20like%20to%20book%20a%20Voucho%20private%20demo." target="_blank" className="inline-block bg-white text-[#AD715D] text-sm font-medium px-8 py-4 rounded-sm hover:bg-white/90 transition-all duration-200 tracking-wide">
            BOOK A PRIVATE DEMO
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FFFDF7] border-t border-[#EAEAE7]/50 py-12 text-xs text-[#2A2421]/40">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>© {new Date().getFullYear()} Voucho Platform Inc. All rights protected.</div>
          <div className="flex gap-8 font-medium">
            <Link href="/terms-of-service" className="hover:text-[#AD715D] transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-[#AD715D] transition-colors">Privacy Policy</Link>
            <Link href="mailto:support@voucho.com" className="hover:text-[#AD715D] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
