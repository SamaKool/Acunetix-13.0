import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BounceCards from '../components/BounceCards';

const images = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
];

export default function HomePage() {
    const navigate = useNavigate();
    const emptyRefs = { heroRef: null, eventRef: null, aboutRef: null, scheduleRef: null };
    const dummyScroll = () => { };

    return (
        <div className="bg-black min-h-screen flex flex-col justify-between">
            <Navbar
                scrollToRefs={emptyRefs}
                scrollToSection={dummyScroll}
                isScrolled={true}
            />

            {/* BounceCards — click any card to go to the LaserFlow page */}
            <div className="flex justify-center items-center min-h-[500px]">
                <BounceCards
                    images={images}
                    containerWidth={500}
                    containerHeight={500}
                    animationDelay={0.1}
                    animationStagger={0.08}
                    enableHover={true}
                    onCardClick={() => navigate('/laser')}
                />
            </div>

            <main className="flex-grow flex items-center justify-center">
                <h1 className="text-white text-5xl font-bold tracking-widest">
                    ACUNETIX 13.0
                </h1>
            </main>

            <Footer scrollToRefs={emptyRefs} scrollToSection={dummyScroll} />
        </div>
    );
}
