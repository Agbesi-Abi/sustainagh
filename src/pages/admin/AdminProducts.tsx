import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../lib/firestore';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1 flex-wrap">
            <span>Market Management</span>
            <i className="fa-solid fa-chevron-right text-[8px] hidden md:inline"></i>
            <span className="text-sustaina-green md:inline">Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 capitalize tracking-tight">
            Inventory Management
          </h1>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900">Inventory Management</h2>
        <button
          onClick={handleAddProduct}
          className="bg-sustaina-green text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-sustaina-green/90 transition-all w-full sm:w-auto text-sm sm:text-base"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-[3.5rem] border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-left min-w-[800px] sm:min-w-full">
            <thead className="bg-stone-50/50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">Product</th>
                <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6">Category</th>
                <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-right">Price</th>
                <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Stock</th>
                <th className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-stone-50/30 transition-colors">
                  <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img src={product.image} alt={product.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover" />
                      <div className="min-w-0">
                        <p className="font-black text-stone-900 truncate">{product.name}</p>
                        <p className="text-[10px] text-stone-400 font-medium truncate max-w-[200px]">
                          {product.description.slice(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                    <span className="px-2 sm:px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 font-black text-stone-900 text-right">
                    GH₵{product.price.toFixed(2)}
                  </td>
                  <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 text-center">
                    <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block">
                      In Stock
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <i className="fa-solid fa-edit text-xs"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal - Placeholder for now */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl">
            <p>Product Modal - To be implemented</p>
            <button onClick={() => setShowProductModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
