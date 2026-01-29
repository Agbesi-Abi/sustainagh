import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { Product, Recipe } from '../types';

// Products
export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, 'products', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Product : null;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, updates);
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};

// Categories
export interface Category {
  id: string;
  name: string;
  image: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const categoriesRef = collection(db, 'categories');
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};

// Recipes
export const getRecipes = async (): Promise<Recipe[]> => {
  const recipesRef = collection(db, 'recipes');
  const snapshot = await getDocs(recipesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
};

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const docRef = doc(db, 'recipes', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Recipe : null;
};

// Users
export const getUsers = async (): Promise<User[]> => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};

export const getUserById = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as User : null;
};

export const addUser = async (user: Omit<User, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'users'), user);
  return docRef.id;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, updates);
};

export const deleteUser = async (id: string): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
};
