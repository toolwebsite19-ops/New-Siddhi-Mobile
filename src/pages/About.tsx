import { Store, ShieldCheck, ThumbsUp, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export function About() {
  return (
    <div className="min-h-screen bg-bg-light pt-8 pb-24">
      <SEO 
        title="About Us" 
        description="Learn about New Siddhi Mobile in Narkatiaganj. Serving customers since 2016 with premium smartphones, original accessories, and trusted service." 
        canonical="https://newsiddhimobilesr.netlify.app/about" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mt-10">
          <h1 className="text-4xl md:text-5xl font-sans font-black mb-6 text-text-main">
            Serving Narkatiaganj <br/><span className="text-danger">Since 2016</span>
          </h1>
          <p className="text-text-muted text-lg leading-relaxed font-medium">
            Welcome to New Siddhi Mobile, your most trusted destination for premium smartphones, accessories, and exceptional customer service in Bihar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="aspect-[4/3] bg-white dark:bg-[#111111] rounded-[16px] border border-border overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
              <img src="https://picsum.photos/seed/mobilestore2/800/600" alt="New Siddhi Mobile Store front" className="w-full h-full object-cover dark:opacity-80" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent flex flex-col justify-end p-6 pt-20">
                <span className="text-white font-sans font-black text-lg mb-1 tracking-wide">New Siddhi Mobile</span>
                <span className="text-gray-300 font-medium text-[12px] flex items-center gap-1.5 leading-snug"><MapPin size={16} className="shrink-0"/> Bhagwati Road, Near Axis Bank Front, Shree Rajmata, Narkatiyaganj</span>
              </div>
            </div>
            <div className="aspect-[4/3] bg-primary rounded-[16px] border border-border flex items-center justify-center relative shadow-sm hover:shadow-md transition-shadow text-primary-foreground p-8 group">
              <div className="text-center">
                 <h4 className="text-sm font-bold uppercase tracking-widest text-[#25D366] mb-2">Our Services</h4>
                 <ul className="space-y-3 font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                   <li>📱 Mobile Sale</li>
                   <li>🎧 Accessories (Charger, Earphones, Cover)</li>
                   <li>🎁 Gift: Different Gadgets</li>
                 </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 font-sans text-text-main flex items-center gap-2"><Store size={26} className="text-danger" /> Our Story</h3>
              <p className="text-text-main font-medium text-lg leading-relaxed bg-white dark:bg-[#111111] p-6 rounded-[12px] border border-border shadow-sm italic">
                “New Siddhi Mobile started in 2016 in Narkatiyaganj with a simple goal — to provide genuine smartphones at the best price.<br /><br />
                Over the years, our owner <strong className="text-danger font-black font-sans">Aryan Raj Shroff</strong> and the team have served hundreds of happy customers by offering trusted products, honest pricing, and excellent after-sales support.<br /><br />
                Today, we are one of the most trusted mobile stores in the area.”
              </p>
            </div>
            
            <div className="pt-8 border-t border-border">
              <h3 className="text-xl font-bold mb-6 font-sans text-text-main">Why We're Different</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white dark:bg-[#111111] border border-border rounded-lg flex items-center justify-center text-danger shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-text-main">100% Genuine Products</h4>
                    <p className="text-sm text-text-muted">We are authorized sellers. Every product comes with standard brand warranty and bill.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white dark:bg-[#111111] border border-border rounded-lg flex items-center justify-center text-danger shadow-sm">
                    <Store size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-text-main">Premium Showroom Experience</h4>
                    <p className="text-sm text-text-muted">Experience devices hands-on before you buy. Compare brands side-by-side.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white dark:bg-[#111111] border border-border rounded-lg flex items-center justify-center text-danger shadow-sm">
                    <ThumbsUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-text-main">Post-Sale Support</h4>
                    <p className="text-sm text-text-muted">Data transfer, screen guards setup, and any troubleshooting – we do it all for free.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

