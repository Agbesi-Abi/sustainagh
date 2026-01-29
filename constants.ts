
import { Product, Recipe } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'shito-sauce',
    name: 'Shito Sauce',
    price: 25.00,
    description: 'Spicy & Authentic black pepper sauce from Ghana. Made with the finest sun-dried peppers, smoked fish, and a secret blend of local spices.',
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800'
    ],
    sustainabilityScore: 95,
    tags: ['spicy', 'authentic']
  },
  {
    id: 'fresh-yam',
    name: 'Fresh Yam',
    price: 15.00,
    description: 'Pona, Medium Size freshly harvested from the Northern Region. Rich in carbohydrates and perfect for frying, boiling, or pounding.',
    category: 'Grains & Tubers',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596561138241-197771746f3a?auto=format&fit=crop&q=80&w=800'
    ],
    sustainabilityScore: 98,
    tags: ['local', 'staple']
  },
  {
    id: 'kejetia-tomatoes',
    name: 'Kejetia Tomatoes',
    price: 30.00,
    originalPrice: 45.00,
    description: 'Per Olonka. Fresh, red and juicy tomatoes sourced directly from Kejetia market. Perfect for Jollof and stews.',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591130901666-4152ad10e31c?auto=format&fit=crop&q=80&w=800'
    ],
    sustainabilityScore: 92,
    tags: ['fresh', 'market', 'deal']
  },
  {
    id: 'waakye-leaves',
    name: 'Waakye Leaves',
    price: 5.00,
    description: 'Large Bundle of organic sorghum leaves. Gives your Waakye that authentic deep red color and unique earthy flavor.',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    sustainabilityScore: 99,
    tags: ['organic', 'traditional']
  },
  {
    id: 'smoked-tilapia',
    name: 'Smoked Tilapia',
    price: 45.00,
    originalPrice: 55.00,
    description: 'Large fish sourced from the Volta Lake. Traditional smoking methods using local wood for a deep, rich aroma.',
    category: 'Proteins',
    image: 'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526744884242-4f3660506e78?auto=format&fit=crop&q=80&w=800'
    ],
    sustainabilityScore: 88,
    tags: ['artisanal', 'deal']
  },
  {
    id: 'brown-rice',
    name: 'Local Brown Rice',
    price: 80.00,
    description: '5kg Bag of stone-free local rice from Ho. High fiber, nutritious, and grown with sustainable water management.',
    category: 'Grains & Tubers',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
    sustainabilityScore: 94,
    tags: ['whole-grain', 'local']
  }
];

export const CATEGORIES = [
  { name: 'Fresh Vegetables', image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Grains & Tubers', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=800' },
  { name: 'Spices & Seasonings', image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800' },
  { name: 'Meat & Fish', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800' },
  { name: 'Snacks & Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800' }
];

export const RECIPES: Recipe[] = [
  {
    id: 'waakye-delight',
    name: 'Traditional Waakye',
    description: 'The ultimate Ghanaian breakfast dish made with rice and beans.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    prepTime: '60 mins',
    difficulty: 'Medium',
    ingredients: ['waakye-leaves', 'brown-rice', 'shito-sauce'],
    instructions: [
      'Wash the beans and soak overnight.',
      'Boil the beans with waakye leaves until half cooked.',
      'Add washed rice and salt to taste.',
      'Simmer until rice and beans are tender.',
      'Serve with shito sauce and garnish.'
    ]
  },
  {
    id: 'light-soup',
    name: 'Volta Tilapia Light Soup',
    description: 'A spicy, refreshing soup that warms the soul.',
    image: 'https://images.unsplash.com/photo-1534604973900-c41ab4c5d4b0?auto=format&fit=crop&q=80&w=800',
    prepTime: '45 mins',
    difficulty: 'Easy',
    ingredients: ['smoked-tilapia', 'kejetia-tomatoes'],
    instructions: [
      'Blend tomatoes, onions, and ginger.',
      'Boil the blend with a bit of water.',
      'Add the smoked tilapia and allow to simmer.',
      'Season with local spices and salt.',
      'Cook for 20 mins and serve hot.'
    ]
  }
];
