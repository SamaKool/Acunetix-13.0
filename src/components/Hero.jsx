import React, { forwardRef, useState, useEffect } from 'react';

import heroVideo from '../assets/Hero.mp4';

const TARGET_DATE = new Date('2026-03-07T00:00:00+05:30').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(TARGET_DATE - now, 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

const Hero = forwardRef((props, ref) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${shibuyaCrossing})` }}
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Darker semi-transparent overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/40 z-10 pointer-events-none" />
        {/* Centered content above video/overlay */}
        <div className="absolute inset-0 min-h-screen flex flex-col items-center justify-center text-center z-20">
          <h1
            className="mx-auto acunetix-hero-heading text-white text-[44vw] md:text-[30vw] lg:text-[20vw] font-[Audiowide,Arial,sans-serif] font-normal tracking-wide drop-shadow-lg leading-[0.7] uppercase whitespace-nowrap"
            style={{ letterSpacing: '0.03em' }}
          >
            ACUNETIX 13.0
          </h1>
          <div className="mt-24">
            <span className="block text-lg md:text-2xl font-semibold text-white/80 tracking-widest mb-2">EVENT STARTS IN</span>
            <span className="block text-3xl md:text-5xl font-mono font-bold text-white bg-black/40 rounded-lg px-6 py-2 shadow-lg mt-12" key={`t-${timeLeft.seconds}`}>
              {pad(timeLeft.days)}:{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </span>
          </div>
        </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
