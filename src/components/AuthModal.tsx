
import React, { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { addUser } from '../lib/firestore';
import * as firebaseAuthExports from 'firebase/auth';

const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} = firebaseAuthExports as any;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type: initialType }) => {
  const [type, setType] = useState(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (type === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
        // Add user to Firestore
        await addUser({
          name: fullName,
          email: email,
          role: 'user',
          createdAt: new Date()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-stone-900">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          {type === 'login' ? 'Welcome Back' : 'Join Sustaina Ghana'}
        </h2>
        <p className="text-stone-500 text-sm mb-8">
          {type === 'login' ? 'Fresh local groceries are waiting for you.' : 'Start your journey towards a sustainable kitchen.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleAuth}>
          {type === 'signup' && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-sustaina-green/10 outline-none" 
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-sustaina-green/10 outline-none" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-sustaina-green/10 outline-none" 
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sustaina-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <i className="fa-solid fa-circle-notch animate-spin"></i>}
            {type === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4">
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400 font-bold">Or continue with</span></div>
          </div>
          
          <button 
            onClick={handleGoogleSignIn}
            className="w-full py-4 border border-stone-200 text-stone-700 font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center justify-center gap-3"
          >
            <i className="fa-brands fa-google text-rose-500"></i>
            Google Account
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-stone-500">
          {type === 'login' ? (
            <p>Don't have an account? <button onClick={() => setType('signup')} className="text-sustaina-green font-bold">Sign Up</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => setType('login')} className="text-sustaina-green font-bold">Log In</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
