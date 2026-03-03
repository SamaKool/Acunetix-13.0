import { useNavigate } from 'react-router-dom';
import LaserFlow from '../components/LaserFlow';

export default function LaserFlowPage() {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
            <LaserFlow
                color="#e92037"
                fogIntensity={0.10}
                wispDensity={1}
                wispIntensity={5}
                flowSpeed={0.5}
                decay={1.1}
            />

            {/* Back button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    zIndex: 100,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
                ← Back
            </button>
        </div>
    );
}
