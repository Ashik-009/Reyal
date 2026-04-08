import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [mainImage, setMainImage] = useState('');
  const dispatch = useDispatch();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    setLoading(true);

    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        // Find the exact product that matches the ID in the URL
        const foundProduct = data.find(p => p.id === parseInt(productId));
        setProduct(foundProduct);
        if (foundProduct) setMainImage(foundProduct.image1);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div className="min-h-screen bg-[#1a1a1a] pt-40 text-center text-white tracking-widest uppercase">Loading details...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#1a1a1a] pt-40 text-center text-red-500 tracking-widest uppercase">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-28 pb-24 px-6 lg:px-12 font-sans">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
        <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/collections/${product.category}`} className="hover:text-yellow-500 transition-colors">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 h-150 sm:h-175">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-y-auto w-full sm:w-24 shrink-0 hide-scroll">
            <button onMouseEnter={() => setMainImage(product.image1)} className={`relative aspect-3/4 w-20 sm:w-full overflow-hidden rounded-md border-2 transition-colors ${mainImage === product.image1 ? 'border-yellow-500' : 'border-transparent'}`}>
              <img src={product.image1} alt="Thumb 1" className="w-full h-full object-cover" />
            </button>
            <button onMouseEnter={() => setMainImage(product.image2)} className={`relative aspect-3/4 w-20 sm:w-full overflow-hidden rounded-md border-2 transition-colors ${mainImage === product.image2 ? 'border-yellow-500' : 'border-transparent'}`}>
              <img src={product.image2} alt="Thumb 2" className="w-full h-full object-cover" />
            </button>
          </div>
          
          {/* Main Image */}
          <div className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden">
            <img src={mainImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl">
                New Arrival
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col pt-4">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-widest uppercase leading-tight mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-yellow-500 font-bold tracking-widest mb-8">
            {product.price}
          </p>

          {/* =========================================
              SIZE SELECTOR (Restored)
          ========================================= */}
          <div className="mb-8 border-t border-gray-800 pt-8">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Size</span>
              <button className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-white underline decoration-gray-600 underline-offset-4 transition-colors">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border text-xs font-bold tracking-widest transition-all ${
                    selectedSize === size 
                    ? 'border-[#cc0000] bg-[#cc0000] text-white' 
                    : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* =========================================
              ADD TO CART BUTTON (Moved outside the loop)
          ========================================= */}
          <button 
            onClick={() => {
              dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: mainImage,
                size: selectedSize
              }));
              
            }}
            className="w-full bg-white text-black font-black tracking-[0.2em] text-sm uppercase py-5 rounded-lg hover:bg-gray-200 transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Add to Cart
          </button>

          {/* Details Accordion (Static for now) */}
          <div className="flex flex-col gap-4 border-t border-gray-800 pt-8">
            <div className="text-sm font-bold tracking-widest text-white uppercase mb-2">Product Details</div>
            <p className="text-xs tracking-wider text-gray-400 leading-relaxed">
              Premium quality fabric tailored for a perfect fit. Designed with attention to detail and crafted to ensure durability and comfort for everyday wear. Machine wash cold, tumble dry low.
            </p>
            <ul className="text-xs tracking-wider text-gray-400 leading-relaxed list-disc list-inside mt-2">
              <li>100% Premium Material</li>
              <li>Tailored modern fit</li>
              <li>Designed in Studio</li>
            </ul>
          </div>

        </div>
      </div>
      
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProductDetail;