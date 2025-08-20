import React from "react";
import Button from "../ui/Button";

const ProductTable = ({ products, onEdit, onDelete }) => (
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2">ID</th>
        <th className="p-2">Name</th>
        <th className="p-2">Description</th>
        <th className="p-2">Price</th>
        <th className="p-2">Image</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr key={product.id} className="border-t">
          <td className="p-2">{product.id}</td>
          <td className="p-2">{product.name}</td>
          <td className="p-2 max-w-[200px] truncate">{product.description}</td>
          <td className="p-2">${product.price}</td>
          <td className="p-2">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-12 w-12 object-cover rounded"
            />
          </td>
          <td className="p-2 flex gap-2">
            <Button variant="secondary" onClick={() => onEdit(product)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;
