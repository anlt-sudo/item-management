const categories = [
  {
    id: 1,
    categoryName: 'Male',
    features: 'Thời trang nam, thể thao, năng động',
    image: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_776,c_limit/5e7cc351-7612-4b56-94ff-b2e063eab300/men-s-shoes-clothing-accessories.png',
  },
  {
    id: 2,
    categoryName: 'Female',
    features: 'Thời trang nữ, cá tính, hiện đại',
    image: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2602,c_limit/f4cea186-c87d-4604-940f-10d8cb88ce91/women-s-shoes-clothing-accessories.jpg',
  },
  {
    id: 3,
    categoryName: 'Kid',
    features: 'Thời trang trẻ em, dễ thương, thoải mái',
    image: 'https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2602,c_limit/09c185b4-7286-4d90-bcca-6e45b5761612/nike-kids.png',
  },
];


const CategorySection = () => (
  <section className="w-full mx-auto py-6 px-2 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Male lớn hơn */}
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center p-6 group cursor-pointer relative overflow-hidden min-h-[340px] md:min-h-[420px] border-2 border-transparent hover:border-black hover:scale-[1.03] duration-200">
        <img src={categories[0].image} alt={categories[0].categoryName} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition" />
        <div className="relative z-10 flex flex-col items-center w-full">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-2 text-gray-900 drop-shadow">{categories[0].categoryName}</h3>
          <p className="text-gray-700 text-lg text-center mb-4 font-medium">{categories[0].features}</p>
          <button className="mt-auto px-6 py-3 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 transition">Khám phá</button>
        </div>
      </div>
    </div>
    {/* Female & Kid nhỏ hơn, xếp dọc */}
    <div className="flex flex-col gap-6 justify-between h-full">
      {categories.slice(1).map(cat => (
        <div key={cat.id} className="bg-white rounded-xl shadow hover:shadow-xl transition-all flex flex-col items-center p-4 group cursor-pointer relative overflow-hidden min-h-[150px] md:min-h-[200px] border-2 border-transparent hover:border-black hover:scale-105 duration-200">
          <img src={cat.image} alt={cat.categoryName} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition" />
          <div className="relative z-10 flex flex-col items-center w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900">{cat.categoryName}</h3>
            <p className="text-gray-600 text-center mb-2 text-base">{cat.features}</p>
            <button className="mt-auto px-4 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition">Khám phá</button>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;
