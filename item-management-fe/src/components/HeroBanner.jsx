const HeroBanner = () => (
  <section className="w-full bg-gradient-to-r from-gray-100 to-white py-10 md:py-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
    <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1536,c_limit/2e7b7b2b-2e2e-4e2e-8e2e-2e2e2e2e2e2e/nike-just-do-it.jpg" alt="Nike Banner" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none" />
    <div className="relative z-10 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 drop-shadow">JUST DO IT.</h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-8">Khám phá bộ sưu tập mới nhất của Nike. Đẳng cấp, năng động, thời thượng.</p>
      <a href="#products" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold text-lg shadow hover:bg-gray-900 transition">Mua ngay</a>
    </div>
  </section>
);

export default HeroBanner;
