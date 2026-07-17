import React, { Suspense, lazy } from 'react';
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer';

// Premium Overlays
import ScrollProgress from './components/Common/ScrollProgress';
import CustomCursor from './components/Common/CustomCursor';
import BackToTop from './components/Common/BackToTop';

// Lazy-loaded secondary sections for high Lighthouse performance
const Features = lazy(() => import('./components/Features'));
const Statistics = lazy(() => import('./components/Statistics'));
const Technology = lazy(() => import('./components/Technology'));
const CTA = lazy(() => import('./components/CTA'));

function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-brand-bg text-brand-text">
      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Custom desktop cursor */}
      <CustomCursor />

      {/* Floating scroll back to top button */}
      <BackToTop />

      {/* Subtle Noise Texture */}
      <div className="grain-overlay" />

      {/* Background radial glows */}
      <BackgroundGlow />

      {/* Sticky header */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow">
        <Hero />
        
        <Suspense fallback={<div className="h-40 w-full flex items-center justify-center opacity-10 font-sans text-xs tracking-wider uppercase">Loading Platform Sections...</div>}>
          <Features />
          <Statistics />
          <Technology />
          <CTA />
        </Suspense>
      </main>

      {/* Full Elegant Footer */}
      <Footer />
    </div>
  );
}

export default App;
