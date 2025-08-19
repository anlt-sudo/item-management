import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsThunk, createProductThunk, updateProductThunk, deleteProductThunk } from '../../features/productSlice';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';


const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.product);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProductsThunk());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductThunk(id));
  };

  const handleModalClose = () => {
    setEditProduct(null);
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      price: Number(form.price.value),
      description: form.description.value,
      image: form.image.value,
    };
    if (editProduct) {
      dispatch(updateProductThunk({ id: editProduct.id, data }));
    } else {
      dispatch(createProductThunk(data));
    }
    handleModalClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <Button onClick={() => setModalOpen(true)} className="mb-4">Create Product</Button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-2"><img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" /></td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">${product.price}</td>
              <td className="p-2 flex gap-2">
                <Button variant="secondary" onClick={() => handleEdit(product)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" defaultValue={editProduct?.name || ''} required />
          <Input label="Price" name="price" type="number" defaultValue={editProduct?.price || ''} required />
          <Input label="Description" name="description" defaultValue={editProduct?.description || ''} required />
          <Input label="Image URL" name="image" defaultValue={editProduct?.image || ''} required />
          <Button type="submit">{editProduct ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
