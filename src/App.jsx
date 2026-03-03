import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BounceCards from './components/BounceCards';
import LaserFlow from './components/LaserFlow';
function App() {

  const images = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  ];

  const emptyRefs = { heroRef: null, eventRef: null, aboutRef: null, scheduleRef: null };
  const dummyScroll = () => { };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <Navbar
        scrollToRefs={emptyRefs}
        scrollToSection={dummyScroll}
        isScrolled={true}
      />

      {/* LaserFlow Section */}
      <div style={{ width: '100%', height: '500px', position: 'relative', backgroundColor: '#000' }}>
        <LaserFlow
          color="#FF79C6"
          fogIntensity={0.45}
          wispDensity={1}
          wispIntensity={5}
          flowSpeed={0.35}
          decay={1.1}
        />
      </div>

      {/* BounceCards Section */}
      <div className="flex justify-center items-center min-h-[500px]">
        <BounceCards
          images={images}
          containerWidth={500}
          containerHeight={500}
          animationDelay={2}
          animationStagger={0}
          enableHover={true}
        />
      </div>


      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold tracking-widest">
          ACUNETIX 13.0
        </h1>
      </main>

      {/* Footer */}
      <Footer scrollToRefs={emptyRefs} scrollToSection={dummyScroll} />
    </div>
  );
}

export default App;