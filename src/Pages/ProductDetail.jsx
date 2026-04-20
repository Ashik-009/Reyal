import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState(''); 
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('description'); 
  
  // 📏 NEW: State to control the Size Guide Popup
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find(p => p._id === productId);
        setProduct(foundProduct);
        if (foundProduct) setMainImage(foundProduct.image1);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching live product:", err);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size first!', { icon: '📏' });
      return;
    }
    
    const sizeInfo = product.sizes?.find(s => s.size === selectedSize);
    if (!sizeInfo || sizeInfo.stock <= 0) {
      toast.error('Sorry, that size is currently out of stock.');
      return;
    }

    dispatch(addToCart({
      id: product._id, 
      name: product.name,
      price: product.price,
      image: mainImage, 
      size: selectedSize
    }));
    toast.success('Added to your cart!');
  };

  if (loading) return <div className="min-h-screen bg-[#1a1a1a] pt-40 text-center text-white tracking-widest uppercase animate-pulse">Loading Live Details...</div>;
  if (!product) return <div className="min-h-screen bg-[#1a1a1a] pt-40 text-center text-[#cc0000] tracking-widest uppercase font-bold">Product not found.</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-28 pb-24 px-6 lg:px-12 font-sans relative">
      
      {/* 📏 THE SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-neutral-900 border border-gray-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-white font-black tracking-[0.2em] uppercase">Size Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-gray-500 hover:text-[#cc0000] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto hide-scroll flex items-center justify-center bg-white">
              {product.sizeGuideImage ? (
                <img src={product.sizeGuideImage} alt="Size Guide" className="w-full max-w-lg object-contain" />
              ) : (
                <div className="py-20 text-center flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300 mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5V6a2.25 2.25 0 00-2.25-2.25h-1.5A2.25 2.25 0 008.25 6v4.5m0 0H6a2.25 2.25 0 00-2.25 2.25v6A2.25 2.25 0 006 21h12a2.25 2.25 0 002.25-2.25v-6A2.25 2.25 0 0018 10.5h-3.75z" /></svg>
                  <p className="text-gray-500 tracking-widest uppercase text-xs font-bold">Standard sizing applies.</p>
                  <p className="text-gray-400 tracking-wider text-[10px] mt-2">No specific size chart uploaded for this item.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-8 flex gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
        <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/collections/${product.category}`} className="hover:text-yellow-500 transition-colors">
          {product.category?.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* LEFT: Image Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 h-150 sm:h-175">
          <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-y-auto w-full sm:w-24 shrink-0 hide-scroll">
            <button onMouseEnter={() => setMainImage(product.image1)} className={`relative aspect-3/4 w-20 sm:w-full overflow-hidden rounded-md border-2 transition-colors ${mainImage === product.image1 ? 'border-[#cc0000]' : 'border-transparent'}`}>
              <img src={product.image1} alt="Thumb 1" className="w-full h-full object-cover" />
            </button>
            {product.image2 && (
              <button onMouseEnter={() => setMainImage(product.image2)} className={`relative aspect-3/4 w-20 sm:w-full overflow-hidden rounded-md border-2 transition-colors ${mainImage === product.image2 ? 'border-[#cc0000]' : 'border-transparent'}`}>
                <img src={product.image2} alt="Thumb 2" className="w-full h-full object-cover" />
              </button>
            )}
          </div>
          
          <div className="relative w-full h-full bg-neutral-900 rounded-xl overflow-hidden">
            <img src={mainImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" />
            {product.isNewArrival && (
              <div className="absolute top-4 left-4 bg-white text-black text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-xl z-20">
                New Arrival
              </div>
            )}
            {product.refNumber && (
              <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center pointer-events-none z-10">
                <div className="bg-linear-to-r from-transparent via-black/60 to-transparent w-[80%] py-2.5 flex flex-col items-center justify-center backdrop-blur-[2px]">
                  <span className="text-gray-200 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase drop-shadow-md">
                    REF. NO: {product.refNumber}
                  </span>
                  <span className="text-[#cc0000] text-[9px] font-black tracking-[0.3em] uppercase mt-1 drop-shadow-md">
                    Reyal
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="flex flex-col pt-4 sticky top-28 h-fit">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-widest uppercase leading-tight mb-2">
            {product.name}
          </h1>
          <p className="text-xl text-yellow-500 font-bold tracking-widest mb-8">
            ৳ {product.price?.toLocaleString()}
          </p>

          {/* DYNAMIC SIZE SELECTOR */}
          <div className="mb-8 border-t border-gray-800 pt-8">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">Size</span>
              
              {/* 📏 UPDATED: Clickable Size Guide Trigger */}
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-yellow-500 underline decoration-gray-600 hover:decoration-yellow-500 underline-offset-4 transition-all"
              >
                Size Guide
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.sizes && product.sizes.map((sizeObj) => {
                const isOutOfStock = sizeObj.stock === 0;
                return (
                  <button 
                    key={sizeObj.size}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    disabled={isOutOfStock}
                    className={`w-12 h-12 flex items-center justify-center border text-xs font-bold tracking-widest transition-all ${
                      isOutOfStock 
                      ? 'border-gray-800 text-gray-800 bg-black/30 cursor-not-allowed line-through' 
                      : selectedSize === sizeObj.size 
                        ? 'border-[#cc0000] bg-[#cc0000] text-white' 
                        : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {sizeObj.size}
                  </button>
                )
              })}
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black font-black tracking-[0.2em] text-sm uppercase py-5 rounded-lg hover:bg-gray-200 transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Add to Cart
          </button>

          {/* DYNAMIC TABBED DETAILS SECTION */}
          <div className="flex flex-col border-t border-gray-800 pt-8">
            <div className="flex gap-8 border-b border-gray-800 mb-6">
              <button onClick={() => setActiveTab('description')} className={`pb-4 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-colors relative ${activeTab === 'description' ? 'text-[#cc0000]' : 'text-gray-500 hover:text-white'}`}>
                Description {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#cc0000]"></span>}
              </button>
              <button onClick={() => setActiveTab('shipping')} className={`pb-4 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase transition-colors relative ${activeTab === 'shipping' ? 'text-[#cc0000]' : 'text-gray-500 hover:text-white'}`}>
                Shipping & Returns {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#cc0000]"></span>}
              </button>
            </div>

            <div className="text-gray-400 text-xs tracking-wider leading-relaxed min-h-37.5">
              {activeTab === 'description' && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                  <div className="grid grid-cols-3 gap-4 font-bold tracking-widest uppercase border-b border-gray-800/50 pb-4">
                    <p><span className="text-gray-500 block mb-1 text-[9px]">Brand</span> <span className="text-white">{product.brand || 'Reyal'}</span></p>
                    <p><span className="text-gray-500 block mb-1 text-[9px]">Color</span> <span className="text-white">{product.color || 'N/A'}</span></p>
                    <p><span className="text-gray-500 block mb-1 text-[9px]">Fabric</span> <span className="text-white">{product.fabric || 'Premium Blend'}</span></p>
                  </div>
                  <p className="mt-2 text-white/80 whitespace-pre-wrap">
                    {product.description || 'Premium quality fabric tailored for a perfect fit. Designed with attention to detail and crafted to ensure durability and comfort for everyday wear.'}
                  </p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                  <p><strong className="text-white">Delivery:</strong> Standard delivery within 3-5 business days across Bangladesh.</p>
                  <p><strong className="text-white">Returns:</strong> We offer a 7-day hassle-free return policy if the item is unworn and tags are attached.</p>
                </div>
              )}
            </div>
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