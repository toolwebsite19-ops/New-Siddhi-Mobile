import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export function Contact() {
  return (
    <div className="min-h-screen bg-bg-light pt-8 pb-24">
      <SEO 
        title="Contact Us | Visit Our Store" 
        description="Visit New Siddhi Mobile at Main Road, Narkatiaganj. Get direction, contact number, and WhatsApp link for quick queries." 
        canonical="https://newsiddhimobilesr.netlify.app/contact" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mt-10">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
             className="text-4xl md:text-5xl font-sans font-black mb-6 text-text-main"
          >
             Visit Our <span className="text-danger">Showroom</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
             className="text-text-muted text-lg font-medium"
          >
            Have questions about a phone or an offer? Visit us directly or get the best price right now via WhatsApp.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-primary text-white border border-border p-8 rounded-[16px] flex flex-col items-center text-center group shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute top-4 right-4 bg-[#25D366] text-white text-[10px] uppercase font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
                 <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-slow"></span> Open Now
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans">New Siddhi Mobile</h3>
              <p className="text-gray-300 mb-4 text-[15px] leading-relaxed">Bhagwati Road, Near Axis Bank Front,<br />Shree Rajmata, Narkatiyaganj</p>
              <div className="bg-white/10 w-full py-2 rounded mb-4 flex justify-center items-center gap-2 text-sm font-medium">
                 <Clock size={16} className="text-accent" /> 9:00 AM - 9:00 PM
              </div>
              <a href="#map" className="text-accent font-bold text-[13px] uppercase tracking-wider hover:underline flex flex-col gap-2 items-center">
                 Get Directions
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="bg-[#25D366] text-white border border-transparent p-8 rounded-[16px] flex flex-col items-center text-center group shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans">Primary WhatsApp</h3>
              <p className="text-white/90 mb-4 text-[15px]">The fastest way to get deals</p>
              <a 
                href="https://wa.me/918271555669"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-attention bg-white text-[#25D366] px-6 py-2.5 rounded font-black tracking-wide hover:bg-gray-50 transition-colors shadow-sm text-lg w-full flex items-center justify-center gap-2"
              >
                Chat Now 🔥
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-white dark:bg-[#111111] border border-border p-8 rounded-[16px] flex flex-col items-center text-center group shadow-sm hover:border-danger transition-colors duration-300 hover:shadow-md"
            >
              <div className="w-16 h-16 bg-bg-light rounded-full flex items-center justify-center text-danger mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                <Phone size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-sans text-text-main">Call or Email Us</h3>
              <p className="text-text-muted mb-4 text-[15px]">Prefer speaking directly?</p>
              <div className="flex flex-col gap-1 items-center">
                <a href="tel:+918271555669" className="text-primary hover:text-danger font-black text-xl transition-colors">+91 8271555669</a>
                <a href="tel:+919470225129" className="text-text-muted hover:text-danger font-bold text-md transition-colors">+91 9470225129</a>
                <a href="mailto:aryanraj.siddhi@gmail.com" className="text-primary hover:text-danger font-semibold mt-2 text-sm transition-colors decoration-solid hover:underline">aryanraj.siddhi@gmail.com</a>
              </div>
            </motion.div>
          </div>

          {/* Quick Enquiry & Maps Container */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white dark:bg-[#111111] rounded-[16px] border border-border p-8 flex-1 shadow-sm"
            >
              <h2 className="text-2xl font-bold mb-6 font-sans text-text-main flex items-center gap-2"><MessageCircle size={28} className="text-[#25D366]" /> Setup an Enquiry</h2>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const text = `Hi, I'm ${formData.get('name')}. ${formData.get('message')}`;
                window.open(`https://wa.me/918271555669?text=${encodeURIComponent(text)}`, '_blank');
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-text-muted">Full Name</label>
                    <input name="name" required type="text" className="w-full bg-bg-light border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:shadow-[0_0_15px_rgba(18,18,18,0.1)] transition-all duration-300 font-medium text-sm text-text-main" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-text-muted">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full bg-bg-light border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:shadow-[0_0_15px_rgba(18,18,18,0.1)] transition-all duration-300 font-medium text-sm text-text-main" placeholder="+91 0000000000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-text-muted">Message</label>
                  <textarea name="message" required rows={4} className="w-full bg-bg-light border border-border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:shadow-[0_0_15px_rgba(18,18,18,0.1)] transition-all duration-300 font-medium text-sm text-text-main resize-none" placeholder="Which phone are you looking for?"></textarea>
                </div>
                <button type="submit" className="glow-hover-green w-full bg-[#25D366] text-white py-4 rounded font-bold flex justify-center items-center gap-2 mt-4 text-sm tracking-wide shadow-sm">
                   👉 Get Best Deal on WhatsApp 🔥
                </button>
              </form>
            </motion.div>

            <motion.div 
              id="map"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="bg-white rounded-[16px] border border-border overflow-hidden relative shadow-sm flex flex-col md:flex-row h-[400px] hover:shadow-lg transition-shadow duration-500"
            >
              <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative group">
                 <img src="https://picsum.photos/seed/mobilestore3/800/600" alt="New Siddhi Mobile Shop Location" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[800ms] ease-out" referrerPolicy="no-referrer" />
                 <a href="https://maps.app.goo.gl/xGxsCSQGoJBUPAKp9?g_st=aw" target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white text-primary font-bold px-6 py-3 rounded shadow-lg flex items-center gap-2">
                     <MapPin size={20} className="text-danger" /> Open in Google Maps
                   </div>
                 </a>
              </div>
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-bg-light relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14210.46824987088!2d84.3414999!3d27.1066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39934164bba5cd95%3A0xcf953ad1e74a621b!2sNarkatiaganj%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 absolute inset-0"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
