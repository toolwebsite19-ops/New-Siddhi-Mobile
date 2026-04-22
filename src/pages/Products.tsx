import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Smartphone, Star } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

type SortOption = 'featured' | 'price-low' | 'price-high';

export function Products() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const categories = ['All', ...new Set(products.map(p => p.brand))];

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === 'All' || product.brand === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // featured (default order)
    });

  return (
    <div className="min-h-screen bg-bg-light pt-8 pb-24">
      <SEO 
        title="All Mobile Phones & Prices" 
        description="Browse our complete collection of smartphones from top brands. Check latest prices of mobile phones available in Narkatiaganj." 
        canonical="https://newsiddhimobilesr.netlify.app/products" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-sans font-black text-text-main mb-2">Our <span className="text-danger">Collection</span></h1>
            <p className="text-text-muted font-medium">Find the perfect device for your needs.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search phones..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-[#111111] border border-border rounded-[8px] pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            </div>
            
            <div className="flex gap-2">
               <div className="relative flex-1 sm:w-48">
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value as SortOption)}
                   className="w-full appearance-none bg-white dark:bg-[#111111] border border-border rounded-[8px] pl-10 pr-8 py-2.5 text-sm font-medium focus:outline-none focus:border-primary shadow-sm cursor-pointer hover:border-text-muted transition-colors"
                 >
                   <option value="featured">Featured First</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                 </select>
                 <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
               </div>
            </div>
          </div>
        </div>

        {/* Categories / Brands */}
        <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold tracking-wide transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-white dark:bg-[#111111] border border-border text-text-muted hover:border-primary hover:text-primary dark:hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => {
              const discount = product.originalPrice 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  key={product.id} className="bg-white dark:bg-[#111111] rounded-[12px] border border-border flex flex-col group relative overflow-hidden transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:border-border/60 hover:scale-[1.01]"
                >
                  <Link to={`/product/${product.id}`} className="flex h-56 bg-bg-light p-6 justify-center items-center relative overflow-hidden">
                    {product.isOffer && discount > 0 && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-[10px] font-bold z-10 shadow-sm">
                         {discount}% OFF
                      </div>
                    )}
                    {product.urgency && (
                      <div className="absolute bottom-4 right-4 bg-danger text-white px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest z-10 shadow-sm border border-danger/50 overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine pointer-events-none"></div>
                         {product.urgency}
                      </div>
                    )}
                    {product.image && (
                      <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-[800ms] relative z-0" referrerPolicy="no-referrer" />
                    )}
                  </Link>
                  
                  <div className="p-6 flex-1 flex flex-col bg-white dark:bg-[#111111]">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[11px] text-text-muted uppercase tracking-widest font-bold opacity-70">{product.brand}</p>
                    </div>
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
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-24 bg-white dark:bg-[#111111] rounded-[16px] border border-border"
          >
            <Smartphone size={48} className="mx-auto text-border mb-4" />
            <h3 className="text-xl font-bold text-text-main mb-2">No products found</h3>
            <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-6 px-6 py-2 bg-text-main text-white rounded font-bold text-sm"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}
