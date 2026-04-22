import { Phone, MapPin, Menu, X, Smartphone, ShoppingBag, Percent, Info, Mail, User, LogOut, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { useDarkMode } from '../hooks/useDarkMode';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const { isDark, toggleDarkMode } = useDarkMode();

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

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Smartphone },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Offers', path: '/offers', icon: Percent },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-light text-text-main">
      {/* Top Bar */}
      <div className="bg-primary border-b border-border py-2 hidden md:block text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-semibold tracking-wider uppercase opacity-80">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer">
              <MapPin size={14} /> Narkatiyaganj, Bihar
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+918271555669" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={14} /> +91 8271555669
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:+919470225129" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={14} /> +91 9470225129
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-[#111111] border-b border-border h-[70px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src="https://i.ibb.co/hFjH6ms9/file-00000000d3a871fa8245ae6ca3b6a5c3.png" alt="New Siddhi Mobile Logo" className="h-[46px] w-[50px] object-cover" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-primary uppercase">New Siddhi Mobile</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold uppercase tracking-[0.5px] transition-colors relative py-2",
                    location.pathname === link.path ? "text-danger" : "text-text-main hover:text-danger"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.me/918271555669?text=Hi%2C%20I%27m%20looking%20for%20a%20smartphone."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                WhatsApp Enquiry
              </a>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-main transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-text-main hover:text-danger text-sm font-semibold transition-colors"
                  title="Logout"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="User" className="w-8 h-8 rounded-full border border-border flex-shrink-0" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-border bg-gray-200 flex items-center justify-center text-gray-700 font-bold flex-shrink-0">
                      {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <LogOut size={18} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 text-text-main hover:text-primary text-sm font-semibold transition-colors uppercase tracking-[0.5px]"
                >
                  <User size={18} /> Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-main hover:text-danger focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-white dark:bg-[#111111] pt-24 pb-6 px-4 flex flex-col border-b border-border"
          >
            <div className="flex-1 flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 py-4 px-4 rounded-xl text-lg font-display font-medium tracking-wide transition-colors",
                    location.pathname === link.path
                      ? "bg-bg-light text-danger"
                      : "text-text-main hover:text-danger"
                  )}
                >
                  <Icon size={20} />
                  {link.name}
                </Link>
                );
              })}
              
              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 py-4 px-4 rounded-xl text-lg font-display font-medium tracking-wide transition-colors text-text-main hover:text-danger"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://wa.me/918271555669"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-center py-4 rounded-xl font-bold font-display tracking-wider flex justify-center items-center gap-2"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#111111] border-t border-border pt-12 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="https://i.ibb.co/hFjH6ms9/file-00000000d3a871fa8245ae6ca3b6a5c3.png" alt="New Siddhi Mobile Logo" className="h-[46px] w-[50px] object-cover" />
                <div className="flex flex-col leading-none">
                  <span className="text-sm font-bold tracking-tight text-primary uppercase">New Siddhi Mobile</span>
                </div>
              </div>
              <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
                Your Trusted Multi-Brand Smartphone Store in Narkatiyaganj Since 2016. Best deals, guaranteed originals.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-text-muted mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm font-semibold text-text-main hover:text-danger transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-text-muted mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-text-main font-medium">
                <li className="flex gap-3 text-text-muted">
                  <MapPin size={18} className="shrink-0 text-danger" />
                  <span className="leading-snug">Bhagwati Road, Near Axis Bank Front,<br/>Shree Rajmata, Narkatiyaganj</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-danger shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <a href="tel:+918271555669" className="hover:text-danger transition-colors">+91 8271555669</a>
                    <a href="tel:+919470225129" className="hover:text-danger transition-colors text-text-muted">+91 9470225129</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-danger" />
                  <a href="mailto:aryanraj.siddhi@gmail.com" className="hover:text-danger transition-colors">aryanraj.siddhi@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             {/* Trust/Brands strip mapped to the new theme style */}
             <div className="flex gap-8 text-sm">
                <div className="flex flex-col">
                  <span className="text-[11px] text-text-muted uppercase font-bold">Service</span>
                  <span className="font-bold">Since 2016</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-text-muted uppercase font-bold">Rating</span>
                  <span className="font-bold">4.9/5 Trust</span>
                </div>
                <div className="flex gap-3 items-center ml-2 border-l border-border pl-8">
                  <a href="https://www.facebook.com/share/1GQwEXK3yw/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-text-main hover:text-white hover:bg-[#1877F2] transition-colors dark:text-white dark:hover:text-white dark:bg-[#1A1A1A]">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/newsiddhimobile?igsh=MXU1Zmg0amNkcXR2MA==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-text-main hover:text-white hover:bg-[#E1306C] transition-colors dark:text-white dark:hover:text-white dark:bg-[#1A1A1A]">
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
             </div>
             
             <div className="flex flex-wrap gap-4 md:gap-8 items-center grayscale opacity-60 font-black text-sm md:text-base">
                 <span>Apple</span>
                 <span>Samsung</span>
                 <span>OnePlus</span>
                 <span>Vivo</span>
                 <span>Oppo</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-6 md:right-8 z-50 flex flex-col gap-4">
        {/* Mobile Call Button */}
        <a
          href="tel:+918271555669"
          className="md:hidden bg-primary text-white w-14 h-14 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        >
          <Phone size={24} />
        </a>
        
        {/* Sticky WhatsApp */}
        <a
          href="https://wa.me/918271555669?text=Hello%20New%20Siddhi%20Mobile%21"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white w-14 h-14 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        </a>
      </div>
    </div>
  );
}

