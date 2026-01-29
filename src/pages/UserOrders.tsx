
import React, { useState, useEffect } from 'react';
// import { db } from '../lib/firebase';
// import * as firebaseFirestoreExports from 'firebase/firestore';
import { Link } from 'react-router-dom';

// const { collection, query, where, orderBy, onSnapshot } = firebaseFirestoreExports as any;

interface UserOrdersProps {
  user: any | null;
}

const UserOrders: React.FC<UserOrdersProps> = ({ user }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    /*
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const ordersData = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    }, (error: any) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
    */
    setLoading(false);
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Please log in to view your orders.</h2>
        <Link to="/" className="text-sustaina-green font-bold underline">Go back home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-stone-900 tracking-tight">My Orders</h1>
        <p className="text-stone-500">Track and manage your fresh local deliveries.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <i className="fa-solid fa-circle-notch animate-spin text-3xl text-sustaina-green"></i>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-200">
          <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-box-open text-stone-300 text-2xl"></i>
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-2">No orders found</h3>
          <p className="text-stone-500 mb-8">You haven't made any orders yet. Let's fix that!</p>
          <Link to="/shop" className="px-8 py-3 bg-sustaina-green text-white font-bold rounded-xl shadow-lg">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div>
                      <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Order ID: {order.id.slice(0, 8)}</p>
                      <p className="text-sm font-bold text-stone-900">
                        {order.createdAt?.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {order.items?.map((item: any, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-stone-50 rounded-lg text-[10px] font-bold text-stone-600 border border-stone-100">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:items-end justify-between">
                  <div className="text-right">
                    <p className="text-xs font-bold text-stone-400 uppercase mb-1">Total Paid</p>
                    <p className="text-xl font-black text-emerald-600">GH₵{order.total?.toFixed(2)}</p>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-8 py-4 bg-stone-50/50 border-t border-stone-100 flex justify-between items-center">
                <p className="text-[10px] text-stone-500 italic">Expected delivery to: {order.region}</p>
                <button className="text-xs font-bold text-sustaina-green hover:underline">View Invoice</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
