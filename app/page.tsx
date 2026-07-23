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
            <Link href="#features" className="hover-underline hover:text-[#AD715D] transition-colors duration-200">Features</Link>
            <Link href="#how-it-works" className="hover-underline hover:text-[#AD715D] transition-colors duration-200">How It Works</Link>
            <Link href="#pricing" className="hover-underline hover:text-[#AD715D] transition-colors duration-200">Pricing</Link>
            <Link href="#faq" className="hover-underline hover:text-[#AD715D] transition-colors duration-200">FAQ</Link>
          </div>
          
          {/* Sharp, commanding primary action */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#2A2421]/70 hover:text-[#AD715D] transition-colors duration-200 hover-underline">
              Login
            </Link>
            <Link href="https://wa.me/923001234567?text=Hello%2C%20I'd%20like%20to%20book%20a%20Voucho%20demo." target="_blank" className="bg-[#AD715D] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#AD715D]/90 transition-all duration-200 shadow-sm">
              Book a Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-36 bg-[#FFFDF7]">
        {/* Subtle background radial gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,244,233,0.5)_0%,rgba(251,251,250,0.3)_60%,transparent_100%)] pointer-events-none" />

        {/* Small floating 3D Google icon badges near margins */}
        <div className="hidden lg:flex absolute top-1/4 left-10 xl:left-24 w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-xl border border-stone-200/50 animate-float-slow animate-fade-in delay-300">
          <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <div className="hidden lg:flex absolute top-1/3 right-10 xl:right-24 w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-xl border border-stone-200/50 animate-float-slower animate-fade-in delay-400">
          <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/>
            <path d="M12 8c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="#A50B0B"/>
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col items-center text-center">
          {/* Hero Copy */}
          <div className="flex flex-col items-center justify-center max-w-3xl">
            <span className="text-xs font-bold tracking-[0.25em] text-[#AD715D]/80 uppercase mb-4 animate-fade-up">
              REPUTATION ENGINEERING
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#2A2421] leading-[1.15] mb-8 animate-fade-up delay-100">
              <span className="font-serif font-bold block mb-2">Your reputation,</span>
              <span className="relative inline-block italic font-serif font-normal text-[#2A2421] px-1">
                EFFORTLESS.
                <svg className="absolute -bottom-3 left-0 w-full h-3 text-[#AD715D]" viewBox="0 0 100 10" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7C30 2 70 2 98 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#2A2421]/70 max-w-2xl leading-relaxed mb-10 font-normal animate-fade-up delay-200">
              Automate customer feedback, compound your Google reviews organically, and manage your absolute reputation through a beautiful, seamless experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-up delay-300">
              <Link href="/register" className="inline-flex items-center justify-center bg-[#AD715D] text-white text-sm font-semibold tracking-wider px-8 py-4 rounded-full hover:bg-[#AD715D]/95 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                REQUEST ACCESS &rarr;
              </Link>
              <Link href="https://wa.me/923001234567?text=Hello%2C%20I'd%20like%20to%20book%20a%20Voucho%20private%20demo." target="_blank" className="inline-flex items-center justify-center border border-[#AD715D] text-[#AD715D] bg-white/40 backdrop-blur-sm text-sm font-semibold tracking-wider px-8 py-4 rounded-full hover:bg-[#AD715D]/10 transition-all duration-200 hover:-translate-y-0.5">
                WHATSAPP US
              </Link>
            </div>
          </div>

          {/* Floating Feature Cards & Depth */}
          <div className="w-full mt-20 max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20 md:translate-y-20 animate-fade-up delay-400">
            {/* Card 1 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/60 p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-3 animate-float-slow text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#AD715D]/10 border border-[#AD715D]/20 flex items-center justify-center text-[#AD715D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">AUTOMATED INTERCEPTS</span>
              </div>
              <p className="text-sm text-stone-600/90 leading-relaxed font-normal">
                Gently collect exact customer insights immediately post-appointment before internal discrepancies scale out.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/60 p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-3 animate-float-slower text-left" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#AD715D]/10 border border-[#AD715D]/20 flex items-center justify-center text-[#AD715D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">REVIEW COMPOUNDING</span>
              </div>
              <p className="text-sm text-stone-600/90 leading-relaxed font-normal">
                Direct public validation straight into your Google Business listing to accelerate organic visibility and local dominance.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/60 p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-3 animate-float-slow text-left" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#AD715D]/10 border border-[#AD715D]/20 flex items-center justify-center text-[#AD715D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                  </svg>
                </div>
                <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">CENTRAL ANALYTICS</span>
              </div>
              <p className="text-sm text-stone-600/90 leading-relaxed font-normal">
                Track locations, operational teams, and structural score trendlines across a high-clarity unified interface.
              </p>
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
            <Link href="/terms-of-service" className="hover-underline hover:text-[#AD715D] transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover-underline hover:text-[#AD715D] transition-colors">Privacy Policy</Link>
            <Link href="mailto:support@voucho.com" className="hover-underline hover:text-[#AD715D] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
