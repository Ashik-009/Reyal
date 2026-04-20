import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaPhone, FaSignOutAlt, FaBoxOpen, FaUserCog } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state to control which dashboard view is active
  const [activeTab, setActiveTab] = useState('orders'); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('reyal_token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch BOTH Profile Data and Order History simultaneously
    Promise.all([
      fetch('http://localhost:5000/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch('http://localhost:5000/api/orders/myorders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ])
      .then(async ([resProfile, resOrders]) => {
        if (!resProfile.ok) throw new Error('Session expired');
        
        const profileData = await resProfile.json();
        setUserData(profileData);

        // If orders fetch successfully, save them. If not, default to empty array.
        if (resOrders.ok) {
          const ordersData = await resOrders.json();
          setOrders(ordersData);
        } else {
          setOrders([]);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem('reyal_token');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('reyal_token');
    navigate('/login');
  };

  // Helper function to color-code the order status badges
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
      case 'Processing': return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
      case 'Shipped': return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
      case 'Delivered': return 'bg-green-500/10 text-green-500 border border-green-500/20';
      case 'Cancelled': return 'bg-red-500/10 text-red-500 border border-red-500/20';
      default: return 'bg-gray-800 text-gray-300 border border-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-40 flex justify-center text-white font-bold tracking-widest uppercase text-sm animate-pulse">
        Loading Secure Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans flex flex-col items-center">
      
      <div className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-[0.15em] uppercase mb-4">
          My Account
        </h1>
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">
          Welcome back, {userData?.fullName.split(' ')[0]}
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar (Navigation) */}
        <div className="col-span-1 lg:col-span-1 bg-neutral-900 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col gap-2 h-fit">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 font-bold tracking-widest text-[10px] sm:text-xs uppercase transition-all p-4 rounded-lg w-full text-left ${
              activeTab === 'orders' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FaBoxOpen className={activeTab === 'orders' ? 'text-black text-lg' : 'text-gray-500 text-lg'} />
            Track Orders
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 font-bold tracking-widest text-[10px] sm:text-xs uppercase transition-all p-4 rounded-lg w-full text-left ${
              activeTab === 'profile' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FaUserCog className={activeTab === 'profile' ? 'text-black text-lg' : 'text-gray-500 text-lg'} />
            Profile Details
          </button>

          <div className="border-t border-gray-800 my-4"></div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-500 hover:text-[#cc0000] font-bold tracking-widest text-[10px] sm:text-xs uppercase transition-colors p-4 w-full text-left rounded-lg hover:bg-red-500/10"
          >
            <FaSignOutAlt className="text-lg" />
            Log Out
          </button>
        </div>

        {/* Right Content Area (Dynamic Views) */}
        <div className="col-span-1 lg:col-span-3 bg-neutral-900 border border-white/5 rounded-xl p-6 sm:p-10 min-h-100">
          
          {/* ========================================= */}
          {/* VIEW 1: ORDER HISTORY & TRACKING          */}
          {/* ========================================= */}
          {activeTab === 'orders' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <h2 className="text-xl font-black text-white tracking-widest uppercase mb-8 border-b border-gray-800 pb-4">
                Recent Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <FaBoxOpen className="text-6xl text-gray-800 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-black/40 border border-gray-800 rounded-lg p-5 sm:p-6 hover:border-gray-700 transition-colors">
                      
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-800/50 pb-4">
                        <div>
                          <p className="text-white font-black tracking-widest uppercase text-xs sm:text-sm">
                            Order #{order._id.slice(-8)}
                          </p>
                          <p className="text-gray-500 text-[10px] tracking-widest font-bold mt-1">
                            Placed on: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {/* Real-Time Status Badge */}
                        <div className={`px-4 py-2 rounded shadow-sm text-[10px] font-black tracking-widest uppercase ${getStatusColor(order.status)}`}>
                          {order.status || 'Pending'}
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="flex gap-4 overflow-x-auto pb-4 hide-scroll">
                        {order.orderItems.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-center shrink-0 w-64 bg-neutral-900 p-3 rounded border border-white/5">
                            <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded bg-black" />
                            <div className="flex flex-col">
                              <span className="text-white text-[10px] font-bold tracking-widest uppercase line-clamp-1">{item.name}</span>
                              <span className="text-gray-500 text-[9px] font-bold tracking-widest mt-1">Size: {item.size} | Qty: {item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-800/50">
                        <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                          {order.paymentMethod}
                        </p>
                        <p className="text-yellow-500 font-bold tracking-widest text-xs sm:text-sm">
                          Total: ৳ {order.totalAmount?.toLocaleString()}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* VIEW 2: PROFILE DETAILS                   */}
          {/* ========================================= */}
          {activeTab === 'profile' && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <h2 className="text-xl font-black text-white tracking-widest uppercase mb-8 border-b border-gray-800 pb-4">
                Profile Details
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <FaUserCircle className="text-4xl text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-1">FULL NAME</p>
                    <p className="text-white font-medium tracking-wider">{userData?.fullName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <FaEnvelope className="text-2xl text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-1">EMAIL ADDRESS</p>
                    <p className="text-white font-medium tracking-wider">{userData?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <FaPhone className="text-2xl text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 mb-1">MOBILE NUMBER</p>
                    <p className="text-white font-medium tracking-wider">
                      {userData?.mobile || <span className="text-gray-600 italic">Not provided</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Profile;