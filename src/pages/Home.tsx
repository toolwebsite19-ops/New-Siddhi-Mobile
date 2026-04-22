import { formatPrice } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { ShieldCheck, Truck, Clock, HeadphonesIcon, MapPin, Instagram, Star, MessageCircle, Facebook, Play, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const brands = [
  "https://cdn.simpleicons.org/apple/111111",
  "https://cdn.simpleicons.org/samsung/111111",
  "https://cdn.simpleicons.org/vivo/111111",
  "https://cdn.simpleicons.org/oppo/111111",
  "https://cdn.simpleicons.org/xiaomi/111111", // Redmi/Xiaomi
  "https://cdn.simpleicons.org/oneplus/111111",
  "https://cdn.simpleicons.org/samsung/111111",
  "https://cdn.simpleicons.org/vivo/111111",
  "https://cdn.simpleicons.org/oppo/111111",
  "https://cdn.simpleicons.org/apple/111111"
];

const hardcodedReviews = [
  { name: "Rahul Sharma", text: "Best price in Narkatiaganj, got free earbuds also! The staff was very helpful in setting up my new iPhone.", rating: 5, img: "https://picsum.photos/seed/rahul/150/150" },
  { name: "Priya Singh", text: "Bought a Vivo recently. They matched the Flipkart price and even gave a free screen guard. Real showroom trust.", rating: 5, img: "https://picsum.photos/seed/priya/150/150" },
  { name: "Amit Kumar", text: "Got an amazing exchange value on my old Samsung. Financing was instant and easy. Highly recommended!", rating: 5, img: "https://picsum.photos/seed/amit/150/150" }
];

export function Home() {
  const { products, reviews: userReviews } = useProducts();
  const featuredProducts = products.filter(p => p.tag === 'Best Seller' || p.isOffer).slice(0, 4);

  const displayReviews = userReviews.length > 0 
    ? [...userReviews.map(r => ({ name: r.authorName, text: r.text, rating: r.rating, img: r.authorPhoto || "https://picsum.photos/seed/"+r.authorName.replace(/\s+/g,'')+"/150/150" })), ...hardcodedReviews]
    : hardcodedReviews;

  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentReview(prev => (prev + 1) % displayReviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 z-0">
           <img src="https://picsum.photos/seed/abstract/1920/1080" alt="Hero background" className="w-full h-full object-cover bg-zoom opacity-20 blend-overlay dark:opacity-40" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
              Live Offers Available
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="text-5xl lg:text-7xl font-sans font-black tracking-tight mb-8 max-w-4xl"
          >
            Best Smartphone Deals in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-accent">Narkatiaganj</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 font-medium mb-12 max-w-2xl px-4"
          >
            Buy iPhone, Samsung, Vivo, Oppo & More. Genuine accessories and top-class after-sales service.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              href="https://wa.me/918271555669"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-hover-green bg-[#25D366] text-white px-8 py-4 rounded font-bold tracking-wide flex items-center justify-center gap-2"
            >
              Get Best Price on WhatsApp 🔥
            </motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              href="#deals"
              className="glow-hover bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded font-bold tracking-wide hover:bg-white/20"
            >
              Check Today's Offer
            </motion.a>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold tracking-wider text-white/60"
          >
            <span className="flex items-center gap-2"><MapPin size={16} /> Bhagwati Road, Narkatiyaganj</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> 100% Genuine</span>
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div> Since 2016</span>
          </motion.div>
        </div>
      </section>

      {/* Brand Logos Logoroll Feature - Infinite Scroll */}
      <section className="bg-bg-light py-10 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center relative">
          <div className="w-full relative overflow-hidden flex items-center">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-light to-transparent z-10 pointer-events-none"></div>
            <div className="animate-marquee flex gap-16 md:gap-32 items-center px-16 will-change-transform">
              {brands.map((logo, index) => (
                <img key={index} src={logo} alt="Brand Partner" className="h-6 md:h-8 object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 dark:invert transition-all duration-300 pointer-events-none" referrerPolicy="no-referrer" />
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-light to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Real Store Experience Section (Animated) */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-6 relative"
            >
               <div className="absolute -inset-4 bg-primary/5 rounded-[20px] -z-10 transform -rotate-2"></div>
               <div className="aspect-[4/3] rounded-[16px] overflow-hidden shadow-sm border border-border group relative">
                 <img src="https://i.ibb.co/FL5pwGkT/Screenshot-20260421-220037-Google.jpg" alt="New Siddhi Mobile Store front" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out will-change-transform" referrerPolicy="no-referrer" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div className="aspect-square rounded-[16px] overflow-hidden shadow-sm border border-border group">
                   <img src="https://i.ibb.co/dsmzVfq2/Screenshot-20260421-220134-Google.jpg" alt="Customer experience" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out will-change-transform" referrerPolicy="no-referrer" />
                 </div>
                 <div className="aspect-square rounded-[16px] overflow-hidden shadow-sm border border-border bg-primary flex flex-col items-center justify-center text-center p-6 text-primary-foreground group relative">
                    <MapPin size={32} className="mb-4 text-accent group-hover:scale-110 transition-transform duration-500 delay-100" />
                    <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                    <p className="text-xs text-primary-foreground/60 mb-4 leading-relaxed">Bhagwati Road, Near Axis Bank<br/>Narkatiyaganj</p>
                    <a href="/contact" className="text-[11px] uppercase tracking-widest font-bold text-primary-foreground border-b border-accent pb-1 hover:text-accent transition-colors">Get Directions</a>
                 </div>
               </div>
            </motion.div>

             <motion.div 
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="inline-block bg-white dark:bg-[#111111] border border-border px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest font-bold mb-6 text-text-muted shadow-sm w-max">
                Physical Showroom
              </div>
              <h2 className="text-3xl md:text-5xl font-sans font-black text-text-main mb-6 leading-tight">
                Not Just Online.<br/>Real <span className="text-danger">Trust</span>. Real <span className="text-danger">Store</span>.
              </h2>
              <p className="text-text-muted leading-relaxed font-medium text-lg mb-8">
                Buying a premium smartphone is an investment. Visit us locally to experience the devices hands-on before making a decision. Our experts provide data-transfer assistance and free setup on all new purchases.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['100% Original Sealed Boxes', 'Zero Down Payment EMI Available', 'Free Temper & Back Cover on Selected Models'].map((item, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                    key={i} className="flex items-center gap-3 font-bold text-text-main text-[15px]"
                  >
                    <div className="w-6 h-6 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0">
                      <ShieldCheck size={14} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <a href="tel:+918271555669" className="glow-hover w-max bg-primary text-primary-foreground px-8 py-4 rounded font-bold tracking-wide flex items-center gap-2 border border-border">
                Call Now for Instant Deal
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="deals" className="py-24 bg-bg-light relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-black text-text-main mb-4">Trending <span className="text-danger">Devices</span></h2>
              <p className="text-text-muted font-medium">Handpicked offers currently running at our showroom.</p>
            </div>
            <a href="/products" className="text-sm font-bold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 hover:text-danger hover:border-danger transition-colors">
              View All Phones
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, i) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
                  key={product.id} className="bg-white dark:bg-[#111111] rounded-[12px] border border-border flex flex-col group relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:border-border/50 hover:scale-[1.01]"
                >
                  <Link to={`/product/${product.id}`} className="flex h-56 bg-bg-light p-6 justify-center items-center relative overflow-hidden">
                    {product.isOffer && discount > 0 && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-[10px] font-bold z-10 shadow-sm border border-border overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
                        {discount}% OFF
                      </div>
                    )}
                    {product.urgency && (
                      <div className="absolute bottom-4 right-4 bg-danger text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest z-10 shadow-sm">
                        {product.urgency}
                      </div>
                    )}
                    {product.image && (
                      <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-out relative z-0" referrerPolicy="no-referrer" />
                    )}
                  </Link>
                  <div className="p-6 flex-1 flex flex-col bg-white dark:bg-[#111111]">
                    <p className="text-[11px] text-text-muted uppercase tracking-widest font-bold mb-1 opacity-70">{product.brand}</p>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-[15px] font-bold text-text-main group-hover:text-danger transition-colors line-clamp-2 h-10 mb-2">{product.name}</h3>
                    </Link>
                    
                    <div className="flex items-center gap-1.5 mb-2 border-b border-border pb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className={star <= Math.round(product.rating) ? "fill-accent text-accent" : "fill-transparent text-border"} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="font-bold text-text-main">{product.rating}</span>
                        <span className="text-text-muted">({product.reviews})</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex items-end gap-3 mb-5">
                        <span className="text-xl font-sans font-extrabold text-text-main">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-text-muted line-through font-medium mb-1">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      
                      <a 
                        href={`https://wa.me/918271555669?text=I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-hover-green w-full block text-center bg-[#25D366] text-white py-2.5 rounded font-bold tracking-wide text-sm"
                      >
                        Get Best Price on WhatsApp 🔥
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Customer Reviews Auto-Slider */}
      <section className="py-24 bg-primary text-white relative flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 w-full h-full relative z-10 text-center">
          <Badge text="Local Voices" />
          <h2 className="text-3xl md:text-5xl font-sans font-black mb-16">Verified <span className="text-accent">Buyers</span></h2>
          
          <div className="relative h-[250px] max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 bg-white/5 border border-white/10 rounded-[16px] backdrop-blur p-8 flex flex-col items-center justify-center text-center shadow-2xl"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-accent" />)}
                </div>
                <p className="text-lg md:text-xl font-medium mb-6 italic leading-relaxed text-gray-200">
                  "{displayReviews[currentReview].text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={displayReviews[currentReview].img} alt={displayReviews[currentReview].name} className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" referrerPolicy="no-referrer" />
                  <div className="text-left">
                    <p className="font-bold text-sm">{displayReviews[currentReview].name}</p>
                    <p className="text-xs text-gray-400">Narkatiyaganj Customer</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {displayReviews.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentReview(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentReview ? 'bg-accent w-6' : 'bg-white/20'}`}
                aria-label={`Go to slide ${i+1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="py-24 bg-bg-light border-t border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
             <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <Instagram size={32} />
             </div>
             <h2 className="text-3xl md:text-4xl font-black font-sans text-text-main mb-4 tracking-tight">Latest from our Feed</h2>
             <div className="flex items-center justify-center gap-4 flex-wrap">
               <a href="https://www.instagram.com/newsiddhimobile?igsh=MXU1Zmg0amNkcXR2MA==" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm md:text-base font-bold hover:text-danger transition-colors flex items-center gap-2">
                 <Instagram size={18} /> @newsiddhimobile
               </a>
               <span className="text-border hidden sm:inline">|</span>
               <a href="https://www.facebook.com/share/1GQwEXK3yw/" target="_blank" rel="noopener noreferrer" className="text-text-muted text-sm md:text-base font-bold hover:text-[#1877F2] transition-colors flex items-center gap-2">
                 <Facebook size={18} /> Facebook Page
               </a>
             </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 animate-slide-up">
              
              {/* Reel 1 */}
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                href="https://www.instagram.com/reel/DXUrqN0jxXK/?igsh=eTJtbWk4bGRmYzNr" target="_blank" rel="noopener noreferrer" 
                className="col-span-1 aspect-[9/16] relative group overflow-hidden bg-bg-light rounded-2xl shadow-sm border border-border block"
              >
                 <img src="https://i.ibb.co/k2pZpbgV/Screenshot-20260422-231001-Instagram.jpg" alt="Redmi A7 Pro" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                 <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-10">
                   <Video size={16} />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50">
                     <Play size={24} className="ml-1 fill-white text-white" />
                   </div>
                 </div>
                 <div className="absolute bottom-4 left-4 right-4 z-20">
                   <p className="text-white text-xs font-medium line-clamp-3">REDMI NEW MODEL LUNCH A7 PRO (6300 MAH POWER FULL BATTERY) कम बजट में बेस्ट फोन</p>
                 </div>
              </motion.a>

              {/* Reel 2 */}
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                href="https://www.instagram.com/reel/DXYRI7qj6J7/?igsh=NHh2N3g5eGluOG8x" target="_blank" rel="noopener noreferrer" 
                className="col-span-1 aspect-[9/16] relative group overflow-hidden bg-bg-light rounded-2xl shadow-sm border border-border block"
              >
                 <img src="https://i.ibb.co/rKhGNkGX/Screenshot-20260422-231021-Instagram.jpg" alt="Oppo Reno 15 pro offer" className="w-full h-full object-cover top-0 object-top group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                 <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-10">
                   <Video size={16} />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50">
                     <Play size={24} className="ml-1 fill-white text-white" />
                   </div>
                 </div>
                 <div className="absolute bottom-4 left-4 right-4 z-20">
                   <p className="text-white text-xs font-medium line-clamp-3">OPPO Reno 15 pro Mini के साथ LAVA का SHARK 5G फोन FREE. BEST DEAL OFFER</p>
                 </div>
              </motion.a>
              
              {/* Reel 3 */}
              <motion.a 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                href="https://www.instagram.com/reel/DXLacByE1Ux/?igsh=a2R4cWlsbTZnMTBj" target="_blank" rel="noopener noreferrer" 
                className="col-span-2 md:col-span-1 aspect-auto sm:aspect-[9/16] relative group overflow-hidden bg-bg-light rounded-2xl shadow-sm border border-border"
              >
                 <img src="https://i.ibb.co/wNTjMcGn/Screenshot-20260422-231802-Instagram.jpg" alt="1M Siddhi Mobile Narkatiaganj" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                 <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-10">
                   <Video size={16} />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                   <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/50">
                     <Play size={24} className="ml-1 fill-white text-white" />
                   </div>
                 </div>
                 <div className="absolute bottom-4 left-4 right-4 z-20">
                   <p className="text-white text-xs font-medium line-clamp-3">#1M (Siddhi Mobile Narkatiaganj) #reelsvideo #10kfollowe #1lik #naturephotography instagood</p>
                 </div>
              </motion.a>

              <div className="col-span-2 grid grid-rows-2 gap-4 lg:gap-6">
                {/* Post 1 */}
                <motion.a 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                  href="https://www.instagram.com/newsiddhimobile?igsh=MXU1Zmg0amNkcXR2MA==" target="_blank" rel="noopener noreferrer" 
                  className="row-span-1 group overflow-hidden bg-bg-light rounded-2xl shadow-sm border border-border relative flex h-full min-h-[120px]"
                >
                   <img src="https://picsum.photos/seed/post1/400/400" alt="Instagram Post" className="w-1/3 md:w-2/5 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                   
                   <div className="p-4 md:p-6 flex flex-col justify-center bg-white dark:bg-[#111111] flex-1 relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Instagram size={14} className="text-danger" />
                        <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Post</span>
                      </div>
                      <p className="text-xs md:text-sm text-text-main font-medium line-clamp-3">Customer satisfaction is our priority! Thank you for choosing New Siddhi Mobile.</p>
                      <span className="text-[10px] text-primary font-bold mt-3 block group-hover:text-danger transition-colors">View on Instagram →</span>
                   </div>
                </motion.a>

                {/* Post 2 / Facebook Fallback */}
                <motion.a 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
                  href="https://www.facebook.com/share/1GQwEXK3yw/" target="_blank" rel="noopener noreferrer" 
                  className="row-span-1 group overflow-hidden bg-bg-light rounded-2xl shadow-sm border border-border relative flex h-full min-h-[120px]"
                >
                   <img src="https://picsum.photos/seed/fb1/400/400" alt="Facebook Reel" className="w-1/3 md:w-2/5 object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
                   
                   <div className="absolute left-2 top-2 bg-black/50 backdrop-blur-md p-1.5 rounded-full text-white z-20">
                     <Facebook size={12} fill="white" />
                   </div>

                   <div className="p-4 md:p-6 flex flex-col justify-center bg-[#f0f2f5] dark:bg-[#1A1A1A] flex-1 relative z-10 group-hover:bg-white dark:group-hover:bg-[#111111] transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Facebook size={14} className="text-[#1877F2]" />
                        <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">Facebook Reel</span>
                      </div>
                      <p className="text-xs md:text-sm text-text-main font-medium line-clamp-3">Join us for the grand festival sale! Connect with our community on Facebook. 🚀</p>
                      <span className="text-[10px] text-[#1877F2] font-bold mt-3 block">Watch on Facebook →</span>
                   </div>
                </motion.a>
              </div>

            </div>
          </div>
      </section>

      {/* Deep CTA / Values */}
      <section className="py-20 relative bg-bg-light overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03] animate-pulse-slow pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="max-w-3xl mx-auto"
          >
             <h2 className="text-3xl md:text-5xl font-sans font-black text-text-main mb-6">Ready to upgrade?</h2>
             <p className="text-text-muted text-lg mb-10 font-medium">Skip the wait. Message us directly on WhatsApp to check stock and ensure you get the absolute best deal in Narkatiyaganj.</p>
             <a 
               href="https://wa.me/918271555669"
               target="_blank"
               rel="noopener noreferrer"
               className="glow-hover-green animate-attention inline-flex items-center gap-2 bg-[#25D366] text-white px-10 py-5 rounded font-bold tracking-wide text-lg"
             >
               <MessageCircle size={24} /> Enquire Now 🔥
             </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center justify-center px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] rounded text-white mb-6 backdrop-blur">
      {text}
    </div>
  );
}
