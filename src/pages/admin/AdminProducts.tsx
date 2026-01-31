import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { getProducts, deleteProduct, addProduct, updateProduct } from '../../lib/firestore';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    category: 'Vegetables',
    image: '',
    sustainabilityScore: 0,
    tags: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProduct = async () => {
    try {
      const productId = await addProduct(newProduct);
      setProducts(prev => [...prev, { ...newProduct, id: productId }]);
      setNewProduct({
        name: '',
        price: 0,
        description: '',
        category: 'Vegetables',
        image: '',
        sustainabilityScore: 0,
        tags: [],
      });
      setShowAddModal(false);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, editingProduct);
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Inventory
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-stone-900">
            Products
          </h1>
          <button className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50">
            <i className="fa-solid fa-plus text-xs" />
            Add product
          </button>
        </div>
        <p className="text-sm text-stone-500 max-w-xl">
          Manage your product catalogue, pricing, and availability.
        </p>
      </header>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-sm text-stone-500">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-sm text-stone-500">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr className="text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-stone-50">
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-md object-cover border border-stone-200"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-stone-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-stone-500 truncate max-w-[240px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-stone-600">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-right font-medium text-stone-900">
                      GH₵{product.price.toFixed(2)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-xs text-stone-500 hover:text-stone-900"
                        >
                          Edit
                        </button>
                        <span className="text-stone-300">•</span>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Price (GH₵)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as Product['category'] })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains & Tubers">Grains & Tubers</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Proteins">Proteins</option>
                  <option value="Fruit">Fruit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Sustainability Score (0-100)</label>
                <input
                  type="number"
                  value={newProduct.sustainabilityScore}
                  onChange={(e) => setNewProduct({ ...newProduct, sustainabilityScore: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-stone-700 border border-stone-300 rounded-md hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-stone-900 mb-4">Edit Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Price (GH₵)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as Product['category'] })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Grains & Tubers">Grains & Tubers</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Proteins">Proteins</option>
                  <option value="Fruit">Fruit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Sustainability Score (0-100)</label>
                <input
                  type="number"
                  value={editingProduct.sustainabilityScore}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sustainabilityScore: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 text-stone-700 border border-stone-300 rounded-md hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="flex-1 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
