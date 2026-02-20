import React from "react";
import { Instagram, Sparkle } from "lucide-react";

const Header = (props) => {
  return (
    <header className="text-center pt-10 pb-6 px-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <svg width="32" height="32" viewBox="0 0 24 24" {...props}>
          <defs>
            <linearGradient
              id="ig-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f9ce34" />
              <stop offset="50%" stopColor="#ee2a7b" />
              <stop offset="100%" stopColor="#6228d7" />
            </linearGradient>
          </defs>
          <Instagram stroke="url(#ig-gradient)" />
        </svg>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          <span
            className="bg-linear-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent inline-block"
          >
            Insta Card
          </span>{' '}
          Generator
        </h1>
      </div>
      <p className="text-muted-foreground text-sm max-w-md mx-auto">
        <svg width="20" height="20" viewBox="0 0 24 24" className="inline-block mr-1 align-text-bottom">
          <defs>
            <linearGradient id="sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f9ce34" />
              <stop offset="50%" stopColor="#ee2a7b" />
              <stop offset="100%" stopColor="#6228d7" />
            </linearGradient>
          </defs>
          <Sparkle stroke="url(#sparkle-gradient)" />
        </svg>
        Create a stunning
        Instagram-style profile card and download it as a high-res image
      </p>
    </header>
  );
};

export default Header;
