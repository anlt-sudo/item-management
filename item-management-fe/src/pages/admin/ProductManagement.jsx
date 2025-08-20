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
import ProductTable from "../../components/product/ProductTable";
import ProductForm from "../../components/product/ProductForm";

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
    if (form.image.files && form.image.files[0]) {
      formData.append("image", form.image.files[0]);
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
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ProductForm
          editProduct={editProduct}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onSubmit={handleSubmit}
          onClose={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default ProductManagement;
