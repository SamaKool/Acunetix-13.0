import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timeline } from '@/components/timeline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShapeGrid from '@/components/ShapeGrid';

function ScheduleDayPage({ dayLabel, scheduleEvents }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const timelineData = scheduleEvents.map((eventItem) => ({
    title: eventItem.time,
    content: (
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{eventItem.name}</h3>
        <p className="text-neutral-300">
          <span className="schedule-icon">📍</span> {eventItem.location}
        </p>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col min-h-screen bg-black relative">
      {/* ShapeGrid Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <ShapeGrid
          direction="diagonal"
          speed={0.3}
          borderColor="#5aeea430"
          squareSize={44}
          hoverFillColor="#2f967c"
          shape="square"
          hoverTrailAmount={4}
        />
      </div>

      <Navbar scrollToRefs={{}} isScrolled={true} />

      <div className="grow relative flex flex-col items-center pt-24 pb-12" style={{ zIndex: 1 }}>
        <button
          className="fixed left-8 top-28 border border-white/15 text-white px-4 py-2 rounded-lg text-sm hover:border-[#00ffc8]/50 hover:text-[#00ffc8]/90 transition-all z-10"
          onClick={() => navigate('/', { state: { scrollTo: 'schedule' } })}
        >
          ← Back
        </button>
        <h1 className="schedule-title" style={{ zIndex: 1, position: 'relative' }}>
          Schedule
        </h1>
        <h2
          className="schedule-subtitle text-white/70"
          style={{ zIndex: 1, position: 'relative', marginTop: '-0.5rem' }}
        >
          ({dayLabel})
        </h2>

        <div
          style={{
            zIndex: 1,
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            marginTop: '2rem',
          }}
        >
          <Timeline data={timelineData} />
        </div>
      </div>

      <Footer scrollToRefs={{}} />
    </div>
  );
}

export default ScheduleDayPage;