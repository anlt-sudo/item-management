import React, { useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ProductForm = ({
  editProduct,
  imagePreview,
  setImagePreview,
  onSubmit,
  onClose,
}) => {
  const fileInputRef = useRef();
  const [localPreview, setLocalPreview] = useState(imagePreview);

  return (
    <form
      onSubmit={onSubmit}
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
              reader.onload = (ev) => {
                setLocalPreview(ev.target.result);
                setImagePreview(ev.target.result);
              };
              reader.readAsDataURL(file);
            } else {
              setLocalPreview(editProduct?.imageUrl || null);
              setImagePreview(editProduct?.imageUrl || null);
            }
          }}
          className="block w-full border rounded p-2"
        />
        {localPreview && (
          <img
            src={localPreview}
            alt="Preview"
            className="mt-2 h-24 w-24 object-cover rounded border"
          />
        )}
      </div>
      <Button type="submit">{editProduct ? "Update" : "Create"}</Button>
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="ml-2"
      >
        Cancel
      </Button>
    </form>
  );
};

export default ProductForm;
