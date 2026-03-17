import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import eventsData from '../data/eventsData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GridScan from '../components/GridScan';

const fieldVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.3 + i * 0.08, ease: 'easeOut' },
  }),
};

const RegisterTreasureTrove = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    rollNo: '',
    college: '',
    year: '',
    department: '',
    teamSize: '',
    transactionId: '',
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Custom Modal State
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    isError: false,
    onClose: null,
  });

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('registerTreasureForm');
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch (e) {}
    }
    const savedStep = sessionStorage.getItem('registerTreasureStep');
    if (savedStep === 'true') {
      setShowPaymentSection(true);
    }
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem('registerTreasureForm', JSON.stringify(form));
    sessionStorage.setItem('registerTreasureStep', showPaymentSection.toString());
  }, [form, showPaymentSection]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showPaymentSection) {
      setShowPaymentSection(true);
      return;
    }

    if (!paymentScreenshot) {
      setModalConfig({
        isOpen: true,
        title: "Missing Information",
        message: "Please upload the payment screenshot before proceeding.",
        isError: true,
      });
      return;
    }
    
    setIsSubmitting(true);

    // Generate unique filename
    const timestamp = Date.now();
    const cleanPhone = form.phone ? form.phone.replace(/\D/g, '') : 'UNKNOWN';
    const extension = paymentScreenshot.name.split('.').pop() || 'png';
    const uniqueFileName = `TREASURE_${cleanPhone}_${timestamp}.${extension}`;

    // Convert the image file to Base64 to safely send it
    const reader = new FileReader();
    reader.onload = async (event) => {
      // Get the base64 string, remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64Data = event.target.result.split(',')[1]; 

      const uploadData = new URLSearchParams();
      uploadData.append('file', base64Data);
      uploadData.append('filename', uniqueFileName);
      uploadData.append('mimeType', paymentScreenshot.type);
      uploadData.append('data', JSON.stringify(form)); // Form details

      const SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwYZhL6yo_1c8bmr2Jbhppm3pEqgw4r43IYcjOpHp0kQifHPDkos65DpLVLPEH7eiUCuA/exec';

      try {
        console.log("Uploading to Google Drive...");
        const response = await fetch(SCRIPT_WEB_APP_URL, {
          method: 'POST',
          body: uploadData,
        });
        
        const result = await response.json();
        
        if(result.status === 'success') {
           setModalConfig({
             isOpen: true,
             title: "REGISTRATION SUCCESSFUL",
             message: `Your payment file was securely tracked as: ${uniqueFileName}`,
             isError: false,
             onClose: () => {
                sessionStorage.removeItem('registerTreasureForm');
                sessionStorage.removeItem('registerTreasureStep');
                navigate('/');
             }
           });
        } else {
           setModalConfig({
             isOpen: true,
             title: "UPLOAD FAILED",
             message: result.message,
             isError: true,
           });
        }

      } catch (err) {
        console.error(err);
        setModalConfig({
          isOpen: true,
          title: "SERVER ERROR",
          message: "Error uploading to server. Please check your connection or contact support.",
          isError: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    reader.readAsDataURL(paymentScreenshot);
  };

  const handleBack = () => {
    navigate('/', { state: { scrollToEvents: true } });
  };

  return (
    <motion.div
      className="min-h-screen relative flex flex-col bg-black overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <GridScan
          sensitivity={0.5}
          lineThickness={1}
          gridScale={0.08}
          scanOpacity={0.2}
          enablePost={true}
          bloomIntensity={0.5}
          noiseIntensity={0.015}
          linesColor="#00ffc8"
          scanColor="#00ffc8"
          chromaticAberration={0.002}
          scanSoftness={5}
          scanGlow={0.8}
        />
      </div>

      {/* Subtle gradient overlay for readability */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-10 grow flex flex-col items-center justify-center px-4 py-24 sm:py-32">
        {/* Back button */}
        <motion.div
          className="w-full max-w-xl mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button
            onClick={handleBack}
            className="register-back-btn"
          >
            ← Back to Events
          </button>
        </motion.div>

        {/* Registration card */}
        <motion.div
          className="register-card"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {/* Heading */}
          <motion.div
            className="flex flex-col items-center justify-center mb-2"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h1 className="register-heading" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#00ffc8', textShadow: 'none' }}>
              TREASURE TROVE
            </h1>
            <p className="register-subtext" style={{ color: '#00ffc8' }}>Registration</p>
          </motion.div>
          <motion.p
            className="register-subtext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{ textTransform: 'none', letterSpacing: 'normal', color: 'rgba(255,255,255,0.7)' }}
          >
            "Seek and You Shall Find" — Secure your spot now.
          </motion.p>

          {/* Divider */}
          <div className="register-divider" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form" autoComplete="off">
            {/* Team Size */}
            <motion.div className="register-field-group" custom={0} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-team-size" className="register-label text-[#00ffc8]">Number of Members *</label>
              <select id="register-team-size" name="teamSize" value={form.teamSize} onChange={handleChange} required className="register-input register-select">
                <option value="" disabled>Select team size...</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </motion.div>

            {/* Leader Name */}
            <motion.div className="register-field-group" custom={1} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-name" className="register-label">Team Leader Name *</label>
              <input id="register-name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="register-input" />
            </motion.div>

            {/* Leader Email */}
            <motion.div className="register-field-group" custom={2} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-email" className="register-label">Team Leader Email *</label>
              <input id="register-email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className="register-input" />
            </motion.div>

            {/* Contact Number */}
            <motion.div className="register-field-group" custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-phone" className="register-label">Leader Contact Number *</label>
              <input id="register-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="WhatsApp/Call" className="register-input" />
            </motion.div>

            {/* Alt Contact */}
            <motion.div className="register-field-group" custom={4} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-alt-phone" className="register-label">Alternate Contact Number *</label>
              <input id="register-alt-phone" type="tel" name="altPhone" value={form.altPhone} onChange={handleChange} required placeholder="Another phone number" className="register-input" />
            </motion.div>

            {/* Roll No */}
            <motion.div className="register-field-group" custom={5} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-rollno" className="register-label">Leader Roll No *</label>
              <input id="register-rollno" type="text" name="rollNo" value={form.rollNo} onChange={handleChange} required placeholder="Registration/Roll Number" className="register-input" />
            </motion.div>

            {/* College */}
            <motion.div className="register-field-group" custom={6} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-college" className="register-label">College Name *</label>
              <input id="register-college" type="text" name="college" value={form.college} onChange={handleChange} required placeholder="Your institution" className="register-input" />
            </motion.div>

            {/* Year */}
            <motion.div className="register-field-group" custom={7} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-year" className="register-label">Year *</label>
              <select id="register-year" name="year" value={form.year} onChange={handleChange} required className="register-input register-select">
                <option value="" disabled>Select your year…</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </motion.div>

            {/* Department */}
            <motion.div className="register-field-group" custom={8} initial="hidden" animate="visible" variants={fieldVariants}>
              <label htmlFor="register-department" className="register-label">Department *</label>
              <input id="register-department" type="text" name="department" value={form.department} onChange={handleChange} required placeholder="e.g. CSE, IT, ECE" className="register-input" />
            </motion.div>

            {/* Payment Section */}
            {showPaymentSection && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex flex-col gap-5 mt-2 overflow-hidden"
              >
                <div className="register-divider !my-0" />
                
                <div className="register-field-group">
                  <label htmlFor="register-transaction" className="register-label text-[#00ffc8]">
                    Transaction ID *
                  </label>
                  <input
                    id="register-transaction"
                    type="text"
                    name="transactionId"
                    value={form.transactionId}
                    onChange={handleChange}
                    required={showPaymentSection}
                    placeholder="Enter UPI Transaction / UTR ID"
                    className="register-input"
                  />
                </div>

                <div className="register-field-group">
                  <label htmlFor="register-proof" className="register-label text-[#00ffc8]">
                    Upload Payment Proof (Screenshot) *
                  </label>
                  <input
                    id="register-proof"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={showPaymentSection}
                    className="register-input !p-0 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#00ffc8]/20 file:text-[#00ffc8] hover:file:bg-[#00ffc8]/30 cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`register-submit ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
              custom={9}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
              whileHover={!isSubmitting ? { scale: 1.04, boxShadow: '0 0 28px rgba(0,255,200,0.35)' } : {}}
              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            >
              {isSubmitting ? 'Processing...' : (showPaymentSection ? 'Finish Registration' : 'Proceed to Payment Details')}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer scrollToRefs={{ heroRef: true }} scrollToSection={() => navigate('/')} />

      {/* Custom Theme Popup Modal */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -30, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="register-card max-w-sm w-full relative overflow-hidden"
              style={{ padding: '2.5rem 2rem' }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffc8 2px, #00ffc8 4px)' }}></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className={`mb-4 ${modalConfig.isError ? 'text-red-500' : 'text-[#00ffc8]'}`}>
                  {modalConfig.isError ? (
                    <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(0,255,200,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <h3 className="font-audiowide text-2xl tracking-wider text-white mb-2" style={{ textShadow: `0 0 10px ${modalConfig.isError ? '#ef4444' : '#00ffc8'}` }}>
                  {modalConfig.title}
                </h3>
                
                <p className="text-white/80 font-inter mb-8 text-sm leading-relaxed">
                  {modalConfig.message}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const cb = modalConfig.onClose;
                    setModalConfig({ ...modalConfig, isOpen: false });
                    if (cb) cb();
                  }}
                  className={`w-full py-3 rounded-lg font-bold tracking-widest uppercase transition-all duration-300
                    ${modalConfig.isError 
                      ? 'bg-transparent border border-red-500 text-red-500 hover:bg-red-500/20' 
                      : 'bg-[#00ffc8] text-black hover:shadow-[0_0_20px_rgba(0,255,200,0.4)]'
                    }`}
                >
                  {modalConfig.isError ? 'Close' : 'Continue'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RegisterTreasureTrove;
