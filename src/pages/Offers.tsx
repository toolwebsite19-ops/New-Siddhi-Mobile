import { motion } from 'motion/react';
import { formatPrice } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { Gift, Zap, Smartphone, Sparkles, Star, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function Offers() {
  const { products } = useProducts();
  const offerProducts = products.filter(p => p.isOffer);
  
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 36, seconds: 59 });

  useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          let { days, hours, minutes, seconds } = prev;
          if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) return prev;
          if (seconds > 0) seconds--;
          else {
            seconds = 59;
            if (minutes > 0) minutes--;
            else {
              minutes = 59;
              if (hours > 0) hours--;
              else {
                hours = 23;
                if (days > 0) days--;
              }
            }
          }
          return { days, hours, minutes, seconds };
        });
      }, 1000);
      return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg-light pt-8 pb-24">
      <SEO 
        title="Mobile Offers & Discounts" 
        description="Current deals, discounts, and exchange offers running at New Siddhi Mobile Narkatiaganj. Get the best value for your money!" 
        canonical="https://newsiddhimobilesr.netlify.app/offers" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Offers */}
        <div className="bg-primary text-white border border-border rounded-[16px] p-8 md:p-12 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
          <div className="absolute inset-0 z-0">
             <img src="https://picsum.photos/seed/abstract_offers/1920/1080" alt="Offers Background" className="w-full h-full object-cover bg-zoom opacity-15 blend-multiply" referrerPolicy="no-referrer" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 relative z-10"
          >
            <span className="inline-block bg-danger text-white border border-danger/30 px-3 py-1.5 rounded text-[11px] uppercase tracking-widest font-bold mb-6 flex items-center gap-2 max-w-max shadow-sm">
              <Clock size={14} className="animate-pulse" /> Sale Ends in {String(timeLeft.days).padStart(2, '0')}d : {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
            <h1 className="text-4xl md:text-5xl font-sans font-black leading-tight mb-6">FESTIVAL <br /><span className="text-danger">MEGA OFFERS</span></h1>
            <p className="text-gray-300 text-lg mb-8 font-medium">Upgrade your smartphone today and enjoy exclusive exchange bonuses, free premium accessories, and 0% EMI options.</p>
            <div className="flex gap-4">
              <a href="#deals" className="glow-hover bg-danger text-white px-8 py-4 rounded font-bold text-sm tracking-wide flex items-center justify-center whitespace-nowrap shadow-sm">View Exclusive Deals</a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="w-full md:w-1/2 grid grid-cols-2 gap-4 relative z-10 text-text-main"
          >
             <div className="bg-white dark:bg-[#111111] border border-border p-6 rounded-[12px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
               <Zap size={28} className="text-danger mb-4" />
               <h3 className="font-bold text-[15px] mb-1">Exchange Bonus</h3>
               <p className="text-[13px] text-text-muted">Up to ₹10,000 extra on old phones</p>
             </div>
             <div className="bg-white dark:bg-[#111111] border border-border p-6 rounded-[12px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
               <Gift size={28} className="text-danger mb-4" />
               <h3 className="font-bold text-[15px] mb-1">Free Gifts</h3>
               <p className="text-[13px] text-text-muted">Smartwatches & earbuds</p>
             </div>
             <div className="bg-white dark:bg-[#111111] border border-border p-6 rounded-[12px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
               <Sparkles size={28} className="text-danger mb-4" />
               <h3 className="font-bold text-[15px] mb-1">0% EMI</h3>
               <p className="text-[13px] text-text-muted">Instant approval, no cost</p>
             </div>
             <div className="bg-white dark:bg-[#111111] border border-border p-6 rounded-[12px] shadow-sm hover:-translate-y-1 transition-transform duration-300">
               <Smartphone size={28} className="text-danger mb-4" />
               <h3 className="font-bold text-[15px] mb-1">Protection</h3>
               <p className="text-[13px] text-text-muted">Free 6-month warranty</p>
             </div>
          </motion.div>
        </div>

        {/* Hot Deals Grid */}
        <div id="deals">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-main flex items-center gap-2"><Zap size={24} className="text-danger"/> CURRENT DEALS</h2>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {offerProducts.map((product, i) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  key={product.id} className="bg-white dark:bg-[#111111] rounded-[12px] border border-border overflow-hidden flex flex-col group relative shadow-sm hover:shadow-xl hover:border-danger hover:-translate-y-1.5 transition-all duration-500 ease-out"
                >
                  <Link to={`/product/${product.id}`} className="flex h-56 bg-bg-light p-6 justify-center items-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold z-10 flex items-center gap-1 shadow-sm">
                      {discount}% OFF
                    </div>
                    {product.tag && (
                      <div className="absolute bottom-4 right-4 bg-danger text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider z-10 shadow-sm border border-danger/50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine pointer-events-none"></div>
                        {product.tag}
                      </div>
                    )}
                    {product.image && (
                      <img src={product.image} alt={product.name} className="h-full object-contain group-hover:scale-105 transition-transform duration-[800ms] ease-out relative z-0 mix-blend-multiply dark:mix-blend-normal" referrerPolicy="no-referrer" />
                    )}
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-[11px] text-text-muted uppercase tracking-widest font-bold mb-1 opacity-70">{product.brand}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-[15px] font-bold text-text-main group-hover:text-danger transition-colors line-clamp-2 h-10 mb-2">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1.5 mb-2 border-b border-border pb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={
                              star <= Math.round(product.rating)
                                ? "fill-accent text-accent"
                                : "fill-transparent text-border"
                            }
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="font-bold text-text-main">{product.rating}</span>
                        <span className="text-text-muted">({product.reviews})</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="flex items-end gap-3 mb-5">
                        <span className="text-2xl font-sans font-extrabold text-danger">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-text-muted line-through font-medium mb-1">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <a 
                        href={`https://wa.me/918271555669?text=I'm%20interested%20in%20the%20offer%20for%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-hover-green w-full text-center bg-[#25D366] text-white py-3 rounded font-bold tracking-wide text-sm shadow-sm flex items-center justify-center gap-2"
                      >
                        Limited Deal - Enquire Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
