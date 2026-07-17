import React from 'react';
import Container from './Common/Container';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-brand-border/40 bg-brand-bg relative pt-16 pb-12 mt-20">
      <Container className="max-w-[1280px]">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          {/* Left Column */}
          <div className="flex flex-col gap-4 items-center md:items-start max-w-sm mx-auto md:mx-0">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-text">
              FarmSense<span className="text-brand-accent">.</span>
            </span>
            <p className="font-sans text-sm text-brand-secondary/70 leading-relaxed">
              AI-powered precision agriculture platform transforming complex farming data into intelligent, actionable insights for sustainable crop yields.
            </p>
          </div>

          {/* Center Column: Quick Links */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="#features" className="text-sm font-sans font-medium text-brand-secondary/80 hover:text-brand-accent transition-colors duration-200">
                Features
              </a>
              <a href="#technology" className="text-sm font-sans font-medium text-brand-secondary/80 hover:text-brand-accent transition-colors duration-200">
                Technology
              </a>
              <a href="#about" className="text-sm font-sans font-medium text-brand-secondary/80 hover:text-brand-accent transition-colors duration-200">
                About
              </a>
              <a href="#contact" className="text-sm font-sans font-medium text-brand-secondary/80 hover:text-brand-accent transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>

          {/* Right Column: Social Icons */}
          <div className="flex flex-col gap-4 items-center md:items-start">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-secondary/40">
              Connect
            </h4>
            <div className="flex gap-4">
              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub Page"
                className="p-2.5 rounded-xl border border-brand-border bg-white/[0.02] text-brand-secondary hover:text-brand-text hover:border-brand-accent/25 transition-all duration-300 hover:rotate-6 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn Page"
                className="p-2.5 rounded-xl border border-brand-border bg-white/[0.02] text-brand-secondary hover:text-brand-text hover:border-brand-accent/25 transition-all duration-300 hover:-rotate-6 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter Page"
                className="p-2.5 rounded-xl border border-brand-border bg-white/[0.02] text-brand-secondary hover:text-brand-text hover:border-brand-accent/25 transition-all duration-300 hover:rotate-6 flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-border/20 text-xs font-sans text-brand-secondary/50 gap-4 text-center md:text-left">
          <span>
            © {new Date().getFullYear()} FarmSense. All rights reserved.
          </span>
          <span className="flex items-center gap-1.5 justify-center">
            Made with <span className="text-[#FF5252] animate-pulse">❤️</span> for Sustainable Agriculture
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
