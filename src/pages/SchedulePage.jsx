import React from 'react';
import { useNavigate } from 'react-router-dom';

const SchedulePage = () => {
    const navigate = useNavigate();

    return (
        <div className="schedule-page">
            <button className="schedule-back-btn" onClick={() => navigate('/')}>
                ← Back
            </button>
            <h1 className="schedule-title">Schedule</h1>
            <p className="schedule-placeholder">Coming soon…</p>
        </div>
    );
};

export default SchedulePage;
