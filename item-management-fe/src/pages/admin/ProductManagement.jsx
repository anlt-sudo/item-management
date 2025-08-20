import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductsThunk,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../features/productSlice";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setImagePreview(product.imageUrl || "");
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductThunk(id));
  };

  const handleModalClose = () => {
    setEditProduct(null);
    setImagePreview(null);
    setModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("price", form.price.value);
    formData.append("description", form.description.value);
    if (form.imageUrl.files[0]) {
      formData.append("image", form.imageUrlles[0]);
    } else if (editProduct && editProduct.imageUrl) {
      formData.append("image", editProduct.imageUrl);
    }
    if (editProduct) {
      dispatch(updateProductThunk({ id: editProduct.id, data: formData }));
    } else {
      dispatch(createProductThunk(formData));
    }
    handleModalClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <Button onClick={() => setModalOpen(true)} className="mb-4">
        Create Product
      </Button>
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
              <td className="p-2 max-w-[200px] truncate">
                {product.description}
              </td>
              <td className="p-2">${product.price}</td>
              <td className="p-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="p-2 flex gap-2">
                <Button variant="secondary" onClick={() => handleEdit(product)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <Input
            label="Name"
            name="name"
            defaultValue={editProduct?.name || ""}
            required
          />
          <Input
            label="Price"
            name="price"
            type="number"
            defaultValue={editProduct?.price || ""}
            required
          />
          <Input
            label="Description"
            name="description"
            defaultValue={editProduct?.description || ""}
            required
          />
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setImagePreview(ev.target.result);
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(editProduct?.imageUrl || null);
                }
              }}
              className="block w-full border rounded p-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-24 w-24 object-cover rounded border"
              />
            )}
          </div>
          <Button type="submit">{editProduct ? "Update" : "Create"}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
