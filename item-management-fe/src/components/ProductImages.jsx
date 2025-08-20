const ProductImages = ({ images, mainImage, onImageClick }) => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <img
      src={mainImage}
      alt="Main"
      className="w-full max-w-xl h-[50vh] md:h-[60vh] object-cover rounded-xl border"
    />
    <div className="flex gap-2 mt-2">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Phụ ${idx + 1}`}
          className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-blue-500"
          onClick={() => onImageClick && onImageClick(img)}
        />
      ))}
    </div>
  </div>
);

export default ProductImages;
