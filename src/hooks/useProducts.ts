import { useState, useCallback, useEffect } from 'react';
import { products as initialProducts, Product } from '../data/products';
import { collection, query, onSnapshot, setDoc, doc, where } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  date: string;
  userId: string;
  isPublic?: boolean;
}

function getMergedProducts(baseProducts: Product[], loadedReviews: Review[]): Product[] {
  return baseProducts.map(p => {
    const prodReviews = loadedReviews.filter(r => r.productId === p.id);
    if (prodReviews.length === 0) return p;
    
    // Only recalculate stats if we have reviews
    const totalRating = (p.rating * p.reviews) + prodReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalCount = p.reviews + prodReviews.length;
    return {
      ...p,
      rating: Number((totalRating / totalCount).toFixed(1)),
      reviews: totalCount
    };
  });
}

export function useProducts() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const productsQ = query(collection(db, 'products'));
    const unsubProducts = onSnapshot(productsQ, (snapshot) => {
      const fetched: Product[] = [];
      snapshot.forEach(d => fetched.push(d.data() as Product));
      setDbProducts(fetched);
    });

    const reviewsQ = query(collection(db, 'reviews'), where('isPublic', '==', true));
    const unsubReviews = onSnapshot(reviewsQ, (snapshot) => {
      const fetchedReviews: Review[] = [];
      snapshot.forEach((doc) => {
        fetchedReviews.push({ id: doc.id, ...doc.data() } as Review);
      });
      fetchedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setReviews(fetchedReviews);
    }, (error) => {
      console.error("Error fetching reviews:", error);
    });

    return () => {
      unsubProducts();
      unsubReviews();
    }
  }, []);

  // Compute merged products whenever dbProducts or reviews change
  useEffect(() => {
    const mergedMap = new Map<string, Product>();
    // 1. Add all hardcoded products
    initialProducts.forEach(p => mergedMap.set(p.id, p));
    // 2. Overwrite / Add DB products
    dbProducts.forEach(p => mergedMap.set(p.id, p));
    
    const combined = Array.from(mergedMap.values());
    setProducts(getMergedProducts(combined, reviews));
  }, [dbProducts, reviews]);

  const addReview = useCallback(async (reviewInfo: Omit<Review, 'id' | 'date' | 'userId' | 'authorPhoto' | 'isPublic'>) => {
    const user = auth.currentUser;

    const reviewId = crypto.randomUUID();
    const newDocRef = doc(db, 'reviews', reviewId);
    
    // For anonymous users, we just supply a placeholder fallback 'anonymous' for userId
    const newReview = {
      ...reviewInfo,
      userId: user?.uid || 'anonymous',
      authorPhoto: user?.photoURL || '',
      date: new Date().toISOString(),
      isPublic: true
    };

    try {
      await setDoc(newDocRef, newReview);
    } catch (e) {
      console.error("Failed to add review: ", e);
      alert("Failed to submit review. Server declined the request.");
    }
  }, []);

  return { products, reviews, addReview };
}
