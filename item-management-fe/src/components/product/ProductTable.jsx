import React from "react";
import Button from "../ui/Button";

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className="w-full border border-black text-sm">
    <thead className="bg-black text-white">
      <tr>
        <th className="p-2 border border-black">ID</th>
        <th className="p-2 border border-black">Name</th>
        <th className="p-2 border border-black">Description</th>
        <th className="p-2 border border-black">Price</th>
        <th className="p-2 border border-black">Image</th>
        <th className="p-2 border border-black">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr
          key={product.id}
          className="border-b border-black hover:bg-gray-100"
        >
          <td className="p-2 border border-black">{product.id}</td>
          <td className="p-2 border border-black">{product.name}</td>
          <td className="p-2 border border-black max-w-[200px] truncate">
            {product.description}
          </td>
          <td className="p-2 border border-black">${product.price}</td>
          <td className="p-2 border border-black">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-12 w-12 object-cover rounded"
            />
          </td>
          <td className="p-2 flex gap-2 justify-center">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
              title="Chỉnh sửa"
              onClick={() => onEdit(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 12.362-12.303z"
                />
              </svg>
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
              title="Xóa"
              onClick={() => onDelete(product.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="black"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;
