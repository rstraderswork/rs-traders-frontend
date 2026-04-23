export default function ProductTable({ products, categories, onEdit, onDelete }) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fabric</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Sizes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Featured</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {product.image_urls && product.image_urls.length > 0 ? (
                      <img 
                        src={product.image_urls[0]} 
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">👕</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      {product.description && (
                        <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {product.category || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.fabric_type || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.size_range || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.is_featured 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.is_featured ? '⭐ Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg font-medium text-sm transition flex items-center gap-1"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg font-medium text-sm transition flex items-center gap-1"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  