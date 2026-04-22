import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ShieldCheck, Tag, Zap, ChevronRight, Truck, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { SEO } from '../components/SEO';

export function ProductDetail() {
  const { id } = useParams();
  const { products, reviews, addReview } = useProducts();
  const product = products.find(p => p.id === id);

  const [reviewForm, setReviewForm] = useState({ rating: 5, author: '', text: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  const defaultColor = product?.colors?.[0] || '';
  const defaultStorage = typeof product?.storage?.[0] === 'string' 
    ? product.storage[0] 
    : (product?.storage?.[0]?.capacity || '');
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [selectedStorage, setSelectedStorage] = useState<string>(defaultStorage);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
      if (product.storage && product.storage.length > 0 && !selectedStorage) {
        setSelectedStorage(typeof product.storage[0] === 'string' ? product.storage[0] : product.storage[0].capacity);
      }
    }
  }, [product, selectedColor, selectedStorage]);

  const currentPrice = React.useMemo(() => {
    if (!product) return 0;
    if (product.storage && product.storage.length > 0 && typeof product.storage[0] !== 'string') {
      const option = product.storage.find((s: any) => s.capacity === selectedStorage);
      return option ? option.price : product.price;
    }
    return product.price;
  }, [product, selectedStorage]);

  const currentOriginalPrice = React.useMemo(() => {
    if (!product) return undefined;
    if (product.originalPrice) {
      // rough heuristic: maintain same proportion if price changes
      if (currentPrice !== product.price) {
        return Math.round(currentPrice * (product.originalPrice / product.price));
      }
      return product.originalPrice;
    }
    return undefined;
  }, [product, currentPrice]);

  const discount = currentOriginalPrice ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) : 0;
  
  const allImages = React.useMemo(() => {
    if (!product) return [];
    return [product.image, ...(product.images || [])];
  }, [product]);

  const [activeImage, setActiveImage] = useState<string>(product?.image || '');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product?.id]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
  };

  const productReviews = reviews.filter(r => r.productId === id);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorName = reviewForm.author || currentUser?.displayName || 'Anonymous';
    if (!id || !reviewForm.text) return;
    await addReview({
      productId: id,
      authorName: authorName,
      rating: reviewForm.rating,
      text: reviewForm.text
    });
    setReviewForm({ rating: 5, author: '', text: '' });
    setShowReviewForm(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bg-light">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-white bg-primary px-6 py-2 rounded font-bold">Back to Products</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.isOffer))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-light pt-6 pb-24">
      <SEO 
        title={`${product.name} Price in Narkatiaganj`} 
        description={`Buy ${product.name} at the best price in Narkatiaganj. Check specs, features, offers, and available variants at New Siddhi Mobile.`} 
        canonical={`https://newsiddhimobilesr.netlify.app/product/${product.id}`} 
        image={product.image}
      />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-sm text-text-muted font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-primary transition-colors">Mobiles</Link>
          <ChevronRight size={14} />
          <span className="text-text-main">{product.brand}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#111111] rounded-[16px] border border-border shadow-sm overflow-hidden flex flex-col lg:flex-row mb-16">
          
          {/* Left Column: Image Area */}
          <div className="w-full lg:w-[45%] flex flex-col md:flex-row border-b lg:border-b-0 lg:border-r border-border bg-white dark:bg-[#111111]">
            
            {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-2 p-4 md:p-6 md:pr-0 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-[100px] shrink-0 border-b md:border-b-0 md:border-r border-border/50">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 w-16 h-16 rounded border ${activeImage === img ? 'border-primary ring-1 ring-primary' : 'border-border opacity-60 hover:opacity-100'} p-1 transition-all bg-white dark:bg-bg-light`}
                  >
                    <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image View */}
            <div className="p-8 md:p-12 flex-1 flex flex-col items-center relative">
              {product.isOffer && discount > 0 && (
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-3 py-1.5 rounded text-xs font-bold z-10 shadow-sm">
                  {discount}% OFF
                </div>
              )}
              
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-[4/5] relative mb-8 flex items-center justify-center"
              >
                {activeImage && (
                  <img 
                    src={activeImage} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-700 ease-out cursor-crosshair" 
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>

              <div className="flex gap-4 w-full mt-auto">
                 <a 
                   href={`https://wa.me/918271555669?text=I'm%20interested%20in%20buying%20the%20${encodeURIComponent(product.name)}${selectedStorage ? encodeURIComponent(' (' + selectedStorage + ')') : ''}${selectedColor ? encodeURIComponent(' in ' + selectedColor) : ''}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 glow-hover-green bg-[#25D366] text-white py-4 rounded font-bold text-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                 >
                   <Zap size={20} className="fill-current text-yellow-300" /> WhatsApp Buy
                 </a>
              </div>
            </div>
          </div>

          {/* Right Column: Details Area */}
          <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-text-muted font-bold tracking-widest text-xs uppercase mb-2">
                {product.brand} Smartphone
              </p>
              <h1 className="text-3xl md:text-4xl font-sans font-black text-text-main mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-[#388e3c] text-white px-2 py-1 rounded text-xs font-bold shadow-sm">
                  {product.rating} <Star size={12} className="fill-current text-white" />
                </div>
                <span className="text-sm font-medium text-text-muted">
                  {product.reviews.toLocaleString()} Ratings & Reviews
                </span>
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="Assured" className="h-5 ml-2 object-contain" referrerPolicy="no-referrer" />
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-sans font-black text-text-main">
                    {formatPrice(currentPrice)}
                  </span>
                  {currentOriginalPrice && (
                    <>
                      <span className="text-sm text-text-muted line-through font-medium mb-1.5">
                        {formatPrice(currentOriginalPrice)}
                      </span>
                      <span className="text-sm font-bold text-[#388e3c] mb-1.5">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs font-medium text-text-muted">Free delivery available. Special price today.</p>
              </div>

              {/* Variations */}
              {(product.storage?.length || product.colors?.length) ? (
                <div className="mb-8 space-y-6">
                  {product.storage && product.storage.length > 0 && (
                    <div>
                      <h3 className="text-sm border-b border-border font-bold text-text-muted uppercase tracking-wider mb-3 pb-2">Storage</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.storage.map((storageOpt: any) => {
                          const optionCapacity = typeof storageOpt === 'string' ? storageOpt : storageOpt.capacity;
                          return (
                            <button
                              key={optionCapacity}
                              onClick={() => setSelectedStorage(optionCapacity)}
                              className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all ${
                                selectedStorage === optionCapacity
                                  ? 'border-primary text-primary bg-primary/5'
                                  : 'border-border text-text-muted hover:border-text-muted'
                              }`}
                            >
                              {optionCapacity}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <h3 className="text-sm border-b border-border font-bold text-text-muted uppercase tracking-wider mb-3 pb-2">Color: <span className="text-text-main capitalize">{selectedColor}</span></h3>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all capitalize ${
                              selectedColor === color
                                ? 'border-primary text-primary bg-primary/5'
                                : 'border-border text-text-muted hover:border-text-muted'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Available Offers */}
              <div className="mb-10">
                <h3 className="font-bold text-text-main mb-4">Available offers</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <Tag size={18} className="text-[#388e3c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm">Special Price:</span> 
                      <span className="text-sm text-text-muted ml-1">Get extra {discount}% off (price inclusive of cashback/coupon)</span>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <Tag size={18} className="text-[#388e3c] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sm">Bank Offer:</span> 
                      <span className="text-sm text-text-muted ml-1">5% Unlimited Cashback on Showroom selected cards.</span>
                    </div>
                  </li>
                  {product.tag && (
                    <li className="flex gap-3 items-start">
                      <Tag size={18} className="text-[#388e3c] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-sm text-danger">Freebie:</span> 
                        <span className="text-sm text-text-muted ml-1">{product.tag} included with this purchase.</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              {/* Key Specs */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="mb-10">
                  <h3 className="font-bold text-text-main mb-4">Key Highlights</h3>
                  <ul className="space-y-3">
                    {product.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-secondary shrink-0 mt-1">•</span>
                        <span className="text-sm font-medium text-text-main">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Specs */}
              <div className="border border-border rounded-[12px] overflow-hidden mb-8 bg-white dark:bg-[#111111] shadow-sm">
                <div className="bg-bg-light px-6 py-4 border-b border-border">
                  <h3 className="font-bold text-text-main">Detailed Specifications</h3>
                </div>
                <div className="p-6 space-y-4">
                  {product.processor && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-sm font-bold text-text-muted sm:w-1/3">Processor</span>
                      <span className="text-sm font-semibold text-text-main sm:w-2/3">{product.processor}</span>
                    </div>
                  )}
                  {product.display && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-sm font-bold text-text-muted sm:w-1/3">Display</span>
                      <span className="text-sm font-semibold text-text-main sm:w-2/3">{product.display}</span>
                    </div>
                  )}
                  {product.camera && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-sm font-bold text-text-muted sm:w-1/3">Camera</span>
                      <span className="text-sm font-semibold text-text-main sm:w-2/3">{product.camera}</span>
                    </div>
                  )}
                  {product.battery && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-border pb-4 last:border-0 last:pb-0">
                      <span className="text-sm font-bold text-text-muted sm:w-1/3">Battery</span>
                      <span className="text-sm font-semibold text-text-main sm:w-2/3">{product.battery}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust & Warranty Info */}
              <div className="border border-border rounded-[12px] p-6 mb-8 bg-bg-light">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="text-text-muted" size={20} />
                     <span className="text-sm font-medium text-text-main">1 Year Brand Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Truck className="text-text-muted" size={20} />
                     <span className="text-sm font-medium text-text-main">Free Store Pickup</span>
                  </div>
                  <div className="flex items-center gap-3 col-span-2 pt-2 mt-2 border-t border-border">
                    <div className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-danger">High Demand: {product.urgency || 'Order quickly before stock runs out.'}</span>
                  </div>
                </div>
              </div>

              {/* Store Details Box */}
              <div className="bg-primary text-white rounded-[12px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                 <div>
                   <h4 className="font-bold mb-1">New Siddhi Mobile Store</h4>
                   <p className="text-xs text-gray-400">Visit us to experience the device hands-on before purchase.</p>
                 </div>
                 <Link to="/contact" className="glow-hover bg-white text-primary text-sm font-bold px-5 py-2.5 rounded shrink-0 w-full sm:w-auto text-center">
                   Get Directions
                 </Link>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white dark:bg-[#111111] rounded-[16px] border border-border shadow-sm p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
             <h2 className="text-2xl font-sans font-bold text-text-main flex items-center gap-2">
                Customer Reviews
             </h2>
             <button 
               onClick={() => setShowReviewForm(!showReviewForm)}
               className="bg-bg-light border border-border text-text-main hover:bg-border/30 px-5 py-2.5 rounded font-bold text-sm transition-colors"
             >
               Write a Review
             </button>
          </div>

          <AnimatePresence>
            {showReviewForm && (
              <motion.form 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleReviewSubmit}
                className="mb-10 p-6 bg-bg-light rounded-[12px] border border-border overflow-hidden"
              >
                <h3 className="font-bold mb-4">Rate this product</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star size={24} className={star <= reviewForm.rating ? "fill-accent text-accent transition-colors" : "fill-transparent text-border transition-colors"} />
                    </button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-bold text-text-main mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={reviewForm.author || (currentUser?.displayName ?? '')}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors bg-white dark:bg-bg-light font-medium"
                    placeholder="John Doe"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-text-main mb-2">Review</label>
                  <textarea 
                    required
                    rows={4}
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary transition-colors bg-white dark:bg-bg-light font-medium resize-none"
                    placeholder="Tell us what you think..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="px-5 py-2 rounded text-sm font-bold text-text-muted hover:bg-border/50">Cancel</button>
                  <button type="submit" className="bg-primary text-primary-foreground px-5 py-2 rounded text-sm font-bold glow-hover">Submit Review</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {productReviews.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-8">No specific reviews for this product yet. Be the first to review!</p>
            ) : (
              productReviews.map(review => (
                <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                       {review.authorPhoto ? (
                         <img src={review.authorPhoto} alt={review.authorName} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                       ) : (
                         <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                           <User size={18} />
                         </div>
                       )}
                       <div>
                         <h4 className="font-bold text-sm text-text-main">{review.authorName}</h4>
                         <p className="text-[11px] text-text-muted">{new Date(review.date).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={14} className={star <= review.rating ? "fill-accent text-accent" : "fill-transparent text-border"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-text-muted mt-3 pl-13 font-medium leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-main flex items-center gap-2">
               Similar Products
            </h2>
            <div className="h-[1px] flex-1 bg-border"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => {
              const relDiscount = p.originalPrice 
                ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) 
                : 0;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 }}
                  key={p.id} 
                  className="bg-white dark:bg-[#111111] rounded-[12px] border border-border flex flex-col group relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-border/60 hover:scale-[1.01]"
                >
                  <Link to={`/product/${p.id}`} className="flex h-56 bg-bg-light p-6 justify-center items-center relative overflow-hidden">
                    {p.isOffer && relDiscount > 0 && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-[10px] font-bold z-10 shadow-sm">
                        {relDiscount}% OFF
                      </div>
                    )}
                    {p.urgency && (
                      <div className="absolute bottom-4 right-4 bg-danger text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest z-10 shadow-sm border border-danger/50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine pointer-events-none"></div>
                        {p.urgency}
                      </div>
                    )}
                    <img src={p.image} alt={p.name} className="h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-[800ms] relative z-0" referrerPolicy="no-referrer" />
                  </Link>
                  
                  <div className="p-6 flex-1 flex flex-col bg-white dark:bg-[#111111]">
                    <p className="text-[11px] text-text-muted uppercase tracking-widest font-bold opacity-70 mb-1">{p.brand}</p>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="text-[15px] font-bold text-text-main group-hover:text-danger transition-colors line-clamp-2 h-10 mb-2">{p.name}</h3>
                    </Link>
                    
                    <div className="flex items-center gap-1.5 mb-2 border-b border-border pb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className={star <= Math.round(p.rating) ? "fill-accent text-accent" : "fill-transparent text-border"} />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[11px]">
                        <span className="font-bold text-text-main">{p.rating}</span>
                        <span className="text-text-muted">({p.reviews})</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex items-end gap-3 mb-5">
                        <span className="text-xl font-sans font-extrabold text-text-main">{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-text-muted line-through font-medium mb-1">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>
                      <a 
                        href={`https://wa.me/918271555669?text=I'm%20interested%20in%20${encodeURIComponent(p.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-hover-green w-full block text-center bg-[#25D366] text-white py-2.5 rounded font-bold tracking-wide text-sm shadow-sm"
                      >
                        Enquire on WhatsApp
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
