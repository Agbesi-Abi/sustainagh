
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Vegetables' | 'Grains & Tubers' | 'Pantry' | 'Proteins' | 'Fruit';
  image: string;
  gallery?: string[]; // Optional array for multiple images
  sustainabilityScore: number; // 1-100
  tags: string[];
  originalPrice?: number; // For deals
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[]; // IDs of products
  instructions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  region: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Delivered';
  createdAt: Date;
}
