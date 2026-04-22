import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Package, MessageSquare, AlertCircle } from 'lucide-react';

export function AdminDashboard() {
  const { products, reviews } = useProducts();

  const totalProducts = products.length;
  const activeOffers = products.filter(p => p.isOffer).length;
  const totalReviews = reviews.length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-lg text-primary">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Products</p>
            <p className="text-2xl font-bold text-text-main">{totalProducts}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="bg-[#10b981]/10 p-4 rounded-lg text-[#10b981]">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Active Offers</p>
            <p className="text-2xl font-bold text-text-main">{activeOffers}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="bg-danger/10 p-4 rounded-lg text-danger">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Reviews</p>
            <p className="text-2xl font-bold text-text-main">{totalReviews}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-border rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-lg mb-4 text-text-main">Welcome to Admin Panel</h3>
        <p className="text-text-muted leading-relaxed mb-4">
          From this panel, you can securely manage the products and offers displayed on your public storefront. 
          Information modified here instantly updates for all customers via Firebase real-time listeners.
        </p>
        <p className="text-text-muted leading-relaxed">
          Navigate to <b>Products & Offers</b> to add new catalog items, assign tags like "Hot Deal 🔥" or "Trending", update specifications, or adjust pricing on different storage variables.
        </p>
      </div>
    </div>
  );
}
