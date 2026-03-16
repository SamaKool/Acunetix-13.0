
import React, { forwardRef, useState, useEffect } from "react";
import heroVideo from "../assets/Hero.mp4";
import ShinyText from "../components/ShinyText";
import FuzzyText from "../components/FuzzyText";

const TARGET_DATE = new Date().getTime() + 1000 * 3600 * 48;

function pad(n) {
  return n < 10 ? "0" + n : n;
}

const Hero = forwardRef((props, ref) => {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      let secondsLeft = (TARGET_DATE - currentDate) / 1000;

      const days = pad(parseInt(secondsLeft / 86400));
      secondsLeft = secondsLeft % 86400;

      const hours = pad(parseInt(secondsLeft / 3600));
      secondsLeft = secondsLeft % 3600;

      const minutes = pad(parseInt(secondsLeft / 60));
      const seconds = pad(parseInt(secondsLeft % 60));

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">

        <div className="w-full flex justify-center mb-6">
          <FuzzyText
            fontSize="clamp(2.5rem, 11vw, 12rem)"
            fontWeight={900}
            fontFamily="Audiowide Local"
            baseIntensity={0.12}
            hoverIntensity={0.4}
            fuzzRange={25}
            direction="horizontal"
            // gradient={["#ffffff", "#47A88A", "#ffffff"]}
            className="max-w-[95vw]"
          >
            ACUNETIX 13.0
          </FuzzyText>
        </div>

        {/* Countdown Clock */}
        <div className="mt-12 relative">

          <div id="countdown">
            <div id="tiles">
              <span>{time.days}</span>
              <span>{time.hours}</span>
              <span>{time.minutes}</span>
              <span>{time.seconds}</span>
            </div>

            <div className="labels">
              <li>
                <ShinyText
                  text="Days"
                  speed={3}
                  color="#289371"
                  shineColor="#7fffd4"
                />
              </li>

              <li>
                <ShinyText
                  text="Hours"
                  speed={3}
                  color="#289371"
                  shineColor="#7fffd4"
                />
              </li>

              <li>
                <ShinyText
                  text="Mins"
                  speed={3}
                  color="#289371"
                  shineColor="#7fffd4"
                />
              </li>

              <li>
                <ShinyText
                  text="Secs"
                  speed={3}
                  color="#289371"
                  shineColor="#7fffd4"
                />
              </li>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;

