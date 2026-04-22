import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Product } from '../../data/products';
import { Plus, Edit2, Trash2, Tag, Save, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';

export function AdminProducts() {
  const { products } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const handleEdit = (p: Product) => {
    setEditingProduct({ ...p });
  };

  const handleNew = () => {
    setEditingProduct({
      id: crypto.randomUUID(),
      name: '',
      brand: '',
      price: 0,
      image: '',
      isOffer: false,
      rating: 5.0,
      reviews: 0,
      storage: []
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.id) return;
    
    // Convert to the exact fields
    const finalProduct = { ...editingProduct };
    
    // Quick sanitization
    if (typeof finalProduct.price === 'string') finalProduct.price = parseInt(finalProduct.price, 10);
    if (typeof finalProduct.rating === 'string') finalProduct.rating = parseFloat(finalProduct.rating);
    if (typeof finalProduct.reviews === 'string') finalProduct.reviews = parseInt(finalProduct.reviews, 10);
    if (finalProduct.originalPrice && typeof finalProduct.originalPrice === 'string') {
        finalProduct.originalPrice = parseInt(finalProduct.originalPrice, 10);
    }
    
    try {
      await setDoc(doc(db, 'products', finalProduct.id), finalProduct);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save. Ensure all required fields are filled out correctly.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete.");
      }
    }
  };

  if (editingProduct) {
    return (
      <div className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-border p-6">
        <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
          <h2 className="text-xl font-bold">{editingProduct.name ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={() => setEditingProduct(null)} className="text-text-muted hover:text-text-main">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Product Name</label>
              <input required type="text" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Brand</label>
              <input required type="text" value={editingProduct.brand || ''} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Sales Price (₹)</label>
              <input required type="number" min="0" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: e.target.value as any})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Original Price (₹) (Optional - Shows discount)</label>
              <input type="number" min="0" value={editingProduct.originalPrice || ''} onChange={e => setEditingProduct({...editingProduct, originalPrice: e.target.value ? e.target.value as any : undefined})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>
            <div className="md:col-span-2 border-t border-border mt-2 pt-6">
              <h3 className="font-bold text-text-main mb-4">Product Images</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Primary Image URL</label>
                  <input required type="text" value={editingProduct.image || ''} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Additional Image URLs (One per line)</label>
                  <textarea 
                    rows={3} 
                    value={editingProduct.images ? editingProduct.images.join('\n') : ''} 
                    onChange={e => setEditingProduct({
                      ...editingProduct, 
                      images: e.target.value.split('\n').filter(line => line.trim() !== '')
                    })} 
                    className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" 
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
                  />
                  <p className="text-xs text-text-muted mt-1 opacity-70">These will appear as thumbnails below/beside the main image on the product page.</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Is Offer / Special Deal?</label>
              <select value={editingProduct.isOffer ? 'true' : 'false'} onChange={e => setEditingProduct({...editingProduct, isOffer: e.target.value === 'true'})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Tag (e.g. Hot Deal 🔥, Trending)</label>
              <input type="text" value={editingProduct.tag || ''} onChange={e => setEditingProduct({...editingProduct, tag: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Urgency Text (e.g. Only 2 left)</label>
              <input type="text" value={editingProduct.urgency || ''} onChange={e => setEditingProduct({...editingProduct, urgency: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" />
            </div>

            {/* Detailed Specifications */}
            <div className="md:col-span-2 border-t border-border mt-2 pt-6">
              <h3 className="font-bold text-text-main mb-4">Detailed Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Processor</label>
                  <input type="text" value={editingProduct.processor || ''} onChange={e => setEditingProduct({...editingProduct, processor: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" placeholder="e.g. Snapdragon 8 Gen 4" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Display</label>
                  <input type="text" value={editingProduct.display || ''} onChange={e => setEditingProduct({...editingProduct, display: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" placeholder="e.g. 6.8-inch AMOLED" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Camera</label>
                  <input type="text" value={editingProduct.camera || ''} onChange={e => setEditingProduct({...editingProduct, camera: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" placeholder="e.g. 200MP Main" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Battery</label>
                  <input type="text" value={editingProduct.battery || ''} onChange={e => setEditingProduct({...editingProduct, battery: e.target.value})} className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" placeholder="e.g. 5000mAh, 65W Charging" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-muted mb-1">Key Highlights (One per line)</label>
                  <textarea 
                    rows={4} 
                    value={editingProduct.highlights ? editingProduct.highlights.join('\n') : ''} 
                    onChange={e => setEditingProduct({
                      ...editingProduct, 
                      highlights: e.target.value.split('\n').filter(line => line.trim() !== '')
                    })} 
                    className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" 
                    placeholder="Premium Titanium Build&#10;All-day battery life" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-muted mb-1">Available Colors (Comma separated)</label>
                  <input 
                    type="text" 
                    value={editingProduct.colors ? editingProduct.colors.join(', ') : ''} 
                    onChange={e => setEditingProduct({
                      ...editingProduct, 
                      colors: e.target.value.split(',').map(c => c.trim()).filter(c => c !== '')
                    })} 
                    className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2" 
                    placeholder="Phantom Black, Phantom White, Titanium" 
                  />
                </div>
              </div>
            </div>

            {/* Storage Options Matrix */}
            <div className="md:col-span-2 border border-border rounded-md p-4 bg-bg-light dark:bg-[#1A1A1A]">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-text-main">Storage Variants & Pricing</label>
                <button 
                  type="button" 
                  onClick={() => {
                    const currentStorage = editingProduct.storage ? [...editingProduct.storage] : [];
                    currentStorage.push({ capacity: '', price: editingProduct.price || 0 } as any);
                    setEditingProduct({ ...editingProduct, storage: currentStorage });
                  }}
                  className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 text-xs rounded font-bold transition flex items-center gap-1"
                >
                  <Plus size={14} /> Add Variant
                </button>
              </div>
              
              <div className="space-y-3">
                {(!editingProduct.storage || editingProduct.storage.length === 0) && (
                  <p className="text-sm text-text-muted italic opacity-70">No storage variants added. Base price applies.</p>
                )}
                {editingProduct.storage?.map((storageOpt: any, index: number) => {
                  const capacity = typeof storageOpt === 'string' ? storageOpt : storageOpt.capacity;
                  const price = typeof storageOpt === 'string' ? editingProduct.price : storageOpt.price;
                  
                  return (
                    <div key={index} className="flex gap-4 items-center bg-white dark:bg-[#111111] p-3 rounded border border-border">
                      <div className="flex-1">
                        <input 
                          type="text" 
                          placeholder="e.g. 12GB + 256GB" 
                          value={capacity} 
                          onChange={e => {
                            const newStorage = [...editingProduct.storage!];
                            newStorage[index] = { capacity: e.target.value, price: price };
                            setEditingProduct({ ...editingProduct, storage: newStorage });
                          }} 
                          className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2 text-sm" 
                        />
                      </div>
                      <div className="w-32">
                        <input 
                          type="number" 
                          placeholder="Price (₹)" 
                          value={price || 0} 
                          onChange={e => {
                            const newStorage = [...editingProduct.storage!];
                            newStorage[index] = { capacity: capacity, price: parseInt(e.target.value, 10) || 0 };
                            setEditingProduct({ ...editingProduct, storage: newStorage });
                          }} 
                          className="w-full bg-white dark:bg-bg-light border border-border rounded-md p-2 text-sm" 
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          const newStorage = editingProduct.storage!.filter((_, i) => i !== index);
                          setEditingProduct({ ...editingProduct, storage: newStorage });
                        }}
                        className="text-danger hover:bg-danger/10 p-2 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-end gap-4">
            <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 border border-border rounded font-medium text-text-main hover:bg-border/30 transition">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 transition flex items-center gap-2">
              <Save size={18} /> Save Product
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center bg-bg-light">
        <h2 className="text-xl font-bold text-text-main">Product Catalog</h2>
        <button onClick={handleNew} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2">
          <Plus size={18} /> Add Product
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-sm text-text-muted uppercase tracking-wider bg-bg-light dark:bg-[#1A1A1A]">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status / Tag</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-border/30 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {p.image ? (
                      <img src={p.image} alt="" className="w-10 h-10 object-contain bg-white rounded border border-border shrink-0 dark:mix-blend-normal mix-blend-multiply" />
                    ) : (
                      <div className="w-10 h-10 bg-bg-light rounded border border-border shrink-0"></div>
                    )}
                    <div>
                      <p className="font-bold text-text-main">{p.name}</p>
                      <p className="text-xs text-text-muted">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-bold text-text-main">₹{p.price.toLocaleString()}</p>
                  {p.originalPrice && <p className="text-xs line-through text-text-muted">₹{p.originalPrice.toLocaleString()}</p>}
                </td>
                <td className="p-4">
                  {p.isOffer && (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 px-2 py-1 rounded text-xs font-bold mr-2">
                      <Tag size={12} /> Offer
                    </span>
                  )}
                  {p.tag && (
                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {p.tag}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(p)} className="text-primary hover:bg-primary/10 p-2 rounded transition mr-2">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-danger hover:bg-danger/10 p-2 rounded transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-text-muted font-medium">
                  No products in catalog. Add your first product!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
