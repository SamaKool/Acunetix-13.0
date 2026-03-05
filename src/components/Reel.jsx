import React, { forwardRef, useState, useRef, useCallback } from 'react';
import cardSvg from '../assets/card.svg';
import chessFloor from '../assets/chess-floor.avif';
import reel3 from '../assets/Reel-Acunetix3.mp4';
import reel4 from '../assets/Reel-Acunetix4.mp4';
import reel5 from '../assets/Reel-Acunetix5.mp4';
import reel6 from '../assets/Reel-Acunetix6.mp4';
import reel7 from '../assets/Reel-Acunetix7.mp4';

// Variety card images for floating BG
import c10clubs from '../assets/cards/10_of_clubs.svg';
import c10diamonds from '../assets/cards/10_of_diamonds.svg';
import c10hearts from '../assets/cards/10_of_hearts.svg';
import c2clubs from '../assets/cards/2_of_clubs.svg';
import c2diamonds from '../assets/cards/2_of_diamonds.svg';
import c2hearts from '../assets/cards/2_of_hearts.svg';
import c3hearts from '../assets/cards/3_of_hearts.svg';
import c5spades from '../assets/cards/5_of_spades.svg';
import cAceClubs from '../assets/cards/ace_of_clubs.svg';
import cJackDiamonds from '../assets/cards/jack_of_diamonds.svg';
import cKingHearts from '../assets/cards/king_of_hearts.svg';
import cQueenSpades from '../assets/cards/queen_of_spades.svg';

const allCards = [
  c10clubs, c10diamonds, c10hearts, c2clubs, c2diamonds, c2hearts,
  c3hearts, c5spades, cAceClubs, cJackDiamonds, cKingHearts, cQueenSpades,
];

const reelVideos = [
  { id: 1, src: reel3, label: 'Acunetix 3' },
  { id: 2, src: reel4, label: 'Acunetix 4' },
  { id: 3, src: reel5, label: 'Acunetix 5' },
  { id: 4, src: reel6, label: 'Acunetix 6' },
  { id: 5, src: reel7, label: 'Acunetix 7' },
];

// 3D floating cards — spread across the section
const floatingBgCards = [
  { card: 0,  top: '5%',  left: '5%',  size: 80,  rX: -30, rY: 25,  rZ: -15, floatX: 15,  floatY: -20, dur: '9s',  delay: '0s' },
  { card: 3,  top: '10%', left: '78%', size: 65,  rX: 35,  rY: -20, rZ: 30,  floatX: -12, floatY: 16,  dur: '11s', delay: '1s' },
  { card: 6,  top: '35%', left: '88%', size: 60,  rX: -35, rY: 45,  rZ: -10, floatX: 14,  floatY: -12, dur: '10s', delay: '2.5s' },
  { card: 8,  top: '55%', left: '3%',  size: 75,  rX: 25,  rY: -40, rZ: 15,  floatX: -14, floatY: 18,  dur: '12s', delay: '0.8s' },
  { card: 10, top: '70%', left: '60%', size: 70,  rX: -40, rY: 20,  rZ: -35, floatX: 10,  floatY: -16, dur: '10s', delay: '3.5s' },
  { card: 11, top: '82%', left: '15%', size: 55,  rX: 15,  rY: -30, rZ: 25,  floatX: -10, floatY: 12,  dur: '11s', delay: '1.8s' },
  { card: 5,  top: '48%', left: '45%', size: 50,  rX: -20, rY: 35,  rZ: -25, floatX: 8,   floatY: -14, dur: '9s',  delay: '4s' },
];

const CARD_COUNT = reelVideos.length;
const ANGLE_STEP = 360 / CARD_COUNT;

const Reel = forwardRef((props, ref) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const videoRefs = useRef({});

  const handleCardEnter = useCallback((id) => {
    setIsPaused(true);
    setHoveredCard(id);
  }, []);

  const handleCardLeave = useCallback(() => {
    setIsPaused(false);
    setHoveredCard(null);
  }, []);

  return (
    <section
      ref={ref}
      id="reel"
      className="relative min-h-screen flex flex-col items-center py-16 sm:py-20 px-4 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Chess floor at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-1 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${chessFloor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-1 pointer-events-none" />

      {/* 3D floating variety cards in BG — tumbling through space */}
      {floatingBgCards.map((fc, i) => {
        const baseTransform = `perspective(600px) rotateX(${fc.rX}deg) rotateY(${fc.rY}deg) rotate(${fc.rZ}deg)`;
        return (
          <img
            key={i}
            src={allCards[fc.card]}
            alt=""
            className="absolute pointer-events-none opacity-60 z-1"
            style={{
              top: fc.top,
              left: fc.left,
              width: `${fc.size}px`,
              animation: `floatRandom ${fc.dur} ease-in-out infinite`,
              animationDelay: fc.delay,
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
              '--float-start': `${baseTransform} translate3d(0px, 0px, 0px)`,
              '--float-mid1': `${baseTransform} translate3d(${fc.floatX}px, ${fc.floatY}px, ${fc.floatX * 0.5}px)`,
              '--float-mid2': `${baseTransform} translate3d(${-fc.floatX * 0.6}px, ${-fc.floatY * 0.8}px, ${-fc.floatX * 0.3}px)`,
              '--float-mid3': `${baseTransform} translate3d(${fc.floatX * 0.4}px, ${fc.floatY * 0.5}px, ${fc.floatX * 0.2}px)`,
            }}
          />
        );
      })}

      {/* Title — Acunetix-style neon glitch: white base + cyan/red glow */}
      <h2
        className="z-3 mb-6 sm:mb-10 text-center uppercase"
        style={{
          fontFamily: "'VerminVibes', 'Impact', 'Arial Black', sans-serif",
          fontSize: 'clamp(2.2rem, 9vw, 6rem)',
          letterSpacing: '0.06em',
          color: '#e8f0ff',
          background: 'linear-gradient(180deg, #ffffff 0%, #b0d4f1 40%, #e63946 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'glitch 2.5s ease-in-out infinite',
          filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.9)) drop-shadow(0 0 40px rgba(0,212,255,0.5)) drop-shadow(0 0 80px rgba(230,57,70,0.4)) drop-shadow(0 4px 2px rgba(230,57,70,0.6))',
        }}
      >
        Carrying Our Legacy
      </h2>

      {/* 3D Carousel — tilted so all cards visible */}
      <div
        className="relative z-3 w-full flex-1 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative"
          style={{
            width: '1px',
            height: '1px',
            transformStyle: 'preserve-3d',
            animation: `spin3d ${CARD_COUNT * 5}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
            transition: 'animation-play-state 0.8s ease',
          }}
        >
          {reelVideos.map((reel, i) => {
            const angle = i * ANGLE_STEP;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 280;
            const isHovered = hoveredCard === reel.id;

            return (
              <div
                key={reel.id}
                className="absolute flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="relative cursor-pointer"
                  style={{
                    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease',
                    transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                    filter: isHovered
                      ? 'drop-shadow(0 0 24px rgba(0,212,255,0.7)) drop-shadow(0 0 48px rgba(230,57,70,0.4))'
                      : 'drop-shadow(0 8px 24px rgba(0,0,0,0.8))',
                  }}
                  onMouseEnter={() => handleCardEnter(reel.id)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="relative w-25 h-37.5 sm:w-32.5 sm:h-48.75 md:w-37.5 md:h-56.25 lg:w-42.5 lg:h-63.75">
                    <img
                      src={cardSvg}
                      alt={`Card ${reel.id}`}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-[12%] sm:inset-[13%] overflow-hidden rounded-sm">
                      <video
                        ref={(el) => { if (el) videoRefs.current[reel.id] = el; }}
                        src={reel.src}
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-[14%] left-[12%] right-[12%] text-center">
                      <span
                        className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white/80"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                      >
                        {reel.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spacer for carousel depth */}
      <div className="h-45 sm:h-55 lg:h-65" />
    </section>
  );
});

Reel.displayName = 'Reel';
export default Reel;
