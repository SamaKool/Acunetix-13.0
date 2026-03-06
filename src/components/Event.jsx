import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CometCard } from './comet-card';

const events = [
  {
    id: 1,
    title: 'Day 1',
    // description: '',
  },
  {
    id: 2,
    title: 'Day 2',
    // description: '',
  },
  {
    id: 3,
    title: 'Day 3',
    // description: '',
  },
];

const Event = forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <section ref={ref} id="events" className="events-section">
      <h2 className="events-heading">Events</h2>

      <div className="events-grid">
        {events.map((evt) => (
          <CometCard key={evt.id} className="event-comet-card">
            <div
              className="event-card-content"
              onClick={() => navigate('/schedule')}
            >
              <h3 className="event-card-title">{evt.title}</h3>
              <p className="event-card-desc">{evt.description}</p>
              <span className="event-card-cta">View Schedule →</span>
            </div>
          </CometCard>
        ))}
      </div>
    </section>
  );
});

Event.displayName = 'Event';
export default Event;