export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  isOffer: boolean;
  tag?: string;
  rating: number;
  reviews: number;
  urgency?: string;
  colors?: string[];
  storage?: StorageOption[];
  highlights?: string[];
  battery?: string;
  camera?: string;
  display?: string;
  processor?: string;
}

export const brands = ["Apple", "Samsung", "Oppo", "Vivo", "Realme", "Redmi", "OnePlus"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    price: 129999,
    image: "https://i.ibb.co/WNY3gR0z/Samsung-galaxy-s26-ultra-5g-black-12gb-512gb-Front-Back-View.webp",
    images: [
      "https://i.ibb.co/WNY3gR0z/Samsung-galaxy-s26-ultra-5g-black-12gb-512gb-Front-Back-View.webp",
      "https://m.media-amazon.com/images/I/71cx1JOT-iL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71v2j0YeWWL._SX679_.jpg"
    ],
    isOffer: true,
    tag: "Hot Deal 🔥",
    rating: 4.9,
    reviews: 189,
    storage: [
      { capacity: "12GB + 256GB", price: 129999 },
      { capacity: "16GB + 512GB", price: 139999 },
      { capacity: "16GB + 1TB", price: 159999 }
    ],
    colors: ["Phantom Black", "Phantom White", "Phantom Grey"],
    highlights: [
      "6.9-inch QHD+ Dynamic AMOLED 2X Display (120Hz)",
      "Snapdragon 8 Gen 4 Processor",
      "200MP Quad Camera Setup",
      "5000mAh Battery with 65W Fast Charging",
      "S Pen Support"
    ],
    camera: "200MP (Main) + 50MP (Pericope Zoom) + 12MP Ultra Wide + 10MP Telephoto",
    battery: "5000mAh, 65W Fast Charging",
    display: "6.9\" QHD+ AMOLED (120Hz)",
    processor: "Snapdragon 8 Gen 4"
  },
  {
    id: "p2",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    price: 74999,
    image: "https://i.ibb.co/WNY3gR0z/Samsung-galaxy-s26-ultra-5g-black-12gb-512gb-Front-Back-View.webp",
    isOffer: false,
    rating: 4.7,
    reviews: 132,
    storage: [
      { capacity: "8GB + 128GB", price: 74999 },
      { capacity: "12GB + 256GB", price: 84999 }
    ],
    colors: ["Phantom Black", "Phantom White"],
    highlights: [
      "6.3-inch FHD+ AMOLED Display (120Hz)",
      "Snapdragon 8 Gen 4 Processor",
      "50MP Triple Camera Setup",
      "4500mAh Battery with 45W Fast Charging"
    ],
    camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
    battery: "4500mAh, 45W Fast Charging",
    display: "6.3\" FHD+ AMOLED (120Hz)",
    processor: "Snapdragon 8 Gen 4"
  },
  {
    id: "p3",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    price: 159900,
    image: "https://i.ibb.co/C5C6WL9G/iphone-17-pro-max-cam-thumb-650x650.png",
    isOffer: true,
    tag: "Best Seller",
    rating: 4.8,
    reviews: 245,
    urgency: "Trending",
    storage: [
      { capacity: "256GB", price: 159900 },
      { capacity: "512GB", price: 179900 },
      { capacity: "1TB", price: 199900 }
    ],
    colors: ["Titanium Black", "Titanium White", "Titanium Grey"],
    highlights: [
      "6.9-inch Super Retina XDR Display (120Hz ProMotion)",
      "A19 Pro Chip",
      "Triple Camera System",
      "Premium Titanium Build",
      "iOS 19"
    ],
    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto (5x Zoom)",
    battery: "All-day battery life, MagSafe",
    display: "6.9\" Super Retina XDR (120Hz)",
    processor: "A19 Pro Chip"
  },
  {
    id: "p4",
    name: "iPhone 17 Pro",
    brand: "Apple",
    price: 129900,
    image: "https://i.ibb.co/C5C6WL9G/iphone-17-pro-max-cam-thumb-650x650.png",
    isOffer: false,
    rating: 4.8,
    reviews: 185,
    storage: [
      { capacity: "128GB", price: 129900 },
      { capacity: "256GB", price: 139900 },
      { capacity: "512GB", price: 159900 }
    ],
    colors: ["Titanium Black", "Titanium White", "Titanium Grey"],
    highlights: [
      "6.3-inch Super Retina XDR Display (120Hz ProMotion)",
      "A19 Pro Chip",
      "Triple Camera System",
      "Premium Titanium Build",
      "iOS 19"
    ],
    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    battery: "Fast Charging & MagSafe Supported",
    display: "6.3\" Super Retina XDR (120Hz)",
    processor: "A19 Pro Chip"
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
