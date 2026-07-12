import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function FinalCTA() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    message: ''
  });

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Trigger celebratory success state and confetti
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    // Format details for the WhatsApp RSVP message
    const phoneNumber = "919999999999"; // Aditya & Riya's contact number
    const attendanceText = formData.attending === 'yes' ? 'Attending with joy 🌸' : 'Respectfully declining 🕊️';
    const guestsText = formData.attending === 'yes' ? `${formData.guests} Guest(s)` : 'N/A';
    const messageText = formData.message.trim() ? formData.message.trim() : 'Sending warm blessings!';

    const rsvpMessage = `💍 *Wedding RSVP Confirmation* 💍\n\n*Name:* ${formData.name}\n*Attendance:* ${attendanceText}\n*Guests:* ${guestsText}\n*Wishes/Message:* ${messageText}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(rsvpMessage)}`;

    // Open WhatsApp Web/App in a new tab to send the message
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative w-full py-32 flex items-center justify-center flex-col text-center z-20 bg-brand-bg px-4">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height}
            recycle={false}
            numberOfPieces={300}
            gravity={0.12}
            colors={['#d97486', '#e8c5c8', '#d4af37', '#faf6f0', '#c5a880']}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-[#d4af37]">
          Kindly Confirm Your Presence
        </h2>
        <p className="text-brand-text/70 font-serif text-sm md:text-base mb-8">
          We would love to have you with us as we begin our new journey together.
        </p>

        {!submitted ? (
          <form 
            onSubmit={handleSubmit} 
            className="glass-card rounded-[2rem] p-8 md:p-10 text-left border border-brand-primary/10 flex flex-col space-y-6"
          >
            {/* Name Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-brand-text/80 font-display font-bold text-sm">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-brand-primary/15 bg-white/50 backdrop-blur-sm text-brand-text font-serif text-sm focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>

            {/* Attendance Radio */}
            <div className="flex flex-col space-y-2">
              <label className="text-brand-text/80 font-display font-bold text-sm">Will you attend?</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 font-serif text-sm text-brand-text/80 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleChange}
                    className="accent-brand-primary h-4 w-4"
                  />
                  <span>Attending with joy</span>
                </label>
                <label className="flex items-center space-x-2 font-serif text-sm text-brand-text/80 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleChange}
                    className="accent-brand-primary h-4 w-4"
                  />
                  <span>Respectfully declining</span>
                </label>
              </div>
            </div>

            {/* Guests Selector */}
            {formData.attending === 'yes' && (
              <div className="flex flex-col space-y-2 animate-fade-in">
                <label htmlFor="guests" className="text-brand-text/80 font-display font-bold text-sm">Number of Guests</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-brand-primary/15 bg-white/50 backdrop-blur-sm text-brand-text font-serif text-sm focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            )}

            {/* Message Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-brand-text/80 font-display font-bold text-sm">Message for Aditya & Riya</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Send your warm wishes..."
                className="w-full px-4 py-3 rounded-xl border border-brand-primary/15 bg-white/50 backdrop-blur-sm text-brand-text font-serif text-sm focus:outline-none focus:border-brand-primary transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-white font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(217,116,134,0.2)] hover:shadow-[0_4px_25px_rgba(217,116,134,0.4)] cursor-pointer"
            >
              Confirm Attendance 💌
            </motion.button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2rem] p-12 text-center border border-brand-primary/10 flex flex-col items-center justify-center space-y-6"
          >
            <div className="text-5xl">❤️</div>
            <h3 className="text-2xl font-display font-bold text-[#d4af37]">Thank You, {formData.name}!</h3>
            <p className="text-brand-text/80 font-serif max-w-md mx-auto text-sm md:text-base leading-relaxed">
              {formData.attending === 'yes' 
                ? `We are absolutely thrilled to celebrate with you and your guests! See you on November 9th.`
                : `Thank you for letting us know. We will miss you, but we greatly appreciate your warm blessings and wishes!`
              }
            </p>
            <motion.button
              onClick={() => setSubmitted(false)}
              className="text-xs uppercase tracking-wider font-display font-bold text-brand-primary/80 hover:text-brand-primary transition-colors underline cursor-pointer"
            >
              Update Attendance Response
            </motion.button>
          </motion.div>
        )}

        {/* Concluding Warm Welcome Note */}
        <motion.div 
          className="mt-20 text-center flex flex-col items-center space-y-4 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-brand-primary text-xl">✨🌸✨</span>
          <h3 className="text-4xl sm:text-5xl font-script text-brand-primary">
            We can't wait to celebrate with you!
          </h3>
          <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-serif">
            As we start this new chapter of our lives, having our dearest friends and family by our side means everything to us. Join us for a beautiful celebration filled with rich traditions, heartfelt laughter, dancing, and memories that we will cherish forever. Your presence will make our union truly complete!
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
