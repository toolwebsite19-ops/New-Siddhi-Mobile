import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, LayoutDashboard, LogOut, Tags, Store } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export function AdminLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Check if user is admin either by hardcoded email or admins collection
        let hasAdminRights = false;
        if (u.email === 'gyantid830@gmail.com') {
          hasAdminRights = true;
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', u.uid));
            if (adminDoc.exists()) hasAdminRights = true;
          } catch (e) {
             console.log("Not admin or permissions error", e);
          }
        }
        setIsAdmin(true); // For testing, let them login if auth succeeds. Or restrict to hasAdminRights: setIsAdmin(hasAdminRights)
        setIsAdmin(hasAdminRights);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      console.error(e);
      let errorMessage = e.message || "An error occurred during login.";
      if (e.code === 'auth/unauthorized-domain') {
        errorMessage = "Error: Your Netlify domain is not authorized in Firebase. Please add this domain to Firebase Authentication settings.";
      }
      setLoginError(errorMessage);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading Admin...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-border max-w-md w-full text-center">
          <Store className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold mb-2 text-text-main">Admin Portal</h1>
          <p className="text-text-muted mb-6">Secondary portal for store owners to manage products and offers.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition"
          >
            Login with Google
          </button>
          
          {loginError && (
            <p className="mt-4 text-red-500 text-sm font-medium">{loginError}</p>
          )}

          {user && !isAdmin && (
            <p className="mt-4 text-danger text-sm">Account <b>{user.email}</b> is not authorized.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#111111] text-text-main flex flex-col border-r border-border">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Store className="text-primary" />
          <h1 className="text-xl font-bold text-text-main tracking-tight">Admin<span className="font-light">Panel</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin' ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-border/30 hover:text-primary dark:hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.includes('/admin/products') ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-border/30 hover:text-primary dark:hover:text-white'}`}
          >
            <Package size={20} />
            Products & Offers
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <div className="mb-4 flex items-center gap-3">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Admin" className="w-10 h-10 rounded-full border border-primary" />
            ) : (
              <div className="w-10 h-10 rounded-full border border-primary bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'A'}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-text-main truncate">{user.displayName}</p>
              <p className="text-xs text-text-muted truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-bg-light hover:bg-border border border-border py-2 rounded text-sm transition-colors text-text-main font-bold"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-bg-light text-text-main">
        <header className="bg-white dark:bg-[#111111] border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-text-main">
            {location.pathname === '/admin' ? 'Dashboard' : 'Manage Products'}
          </h2>
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View Live Store
          </Link>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
