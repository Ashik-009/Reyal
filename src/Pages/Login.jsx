import React, { useState } from 'react';
import { FaLock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'; 
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google'; // 🚀 NEW: Import Google Hook

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '', email: '', mobile: '', password: '', confirmPassword: ''
  });

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // --- STANDARD LOGIN ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to log in.');

      localStorage.setItem('reyal_token', data.token);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- STANDARD REGISTER ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (registerForm.password !== registerForm.confirmPassword) {
      return setError('Passwords do not match');
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: registerForm.fullName, email: registerForm.email,
          mobile: registerForm.mobile, password: registerForm.password
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create an account.');

      localStorage.setItem('reyal_token', data.token);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 🚀 GOOGLE SIGN-IN LOGIC ---
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const toastId = toast.loading('Authenticating with Google...');
      try {
        // Send the Google Token to our Node.js Backend to verify and create the user
        const response = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Google Login failed on server');

        // Save YOUR backend's JWT token, not Google's!
        localStorage.setItem('reyal_token', data.token);
        toast.success('Successfully logged in with Google!', { id: toastId });
        navigate('/');
      } catch (err) {
        console.error("Google Auth Error:", err);
        toast.error(err.message, { id: toastId });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error('Google Sign-In was cancelled or failed.');
    }
  });

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-20 px-6 lg:px-12 font-sans flex flex-col items-center">
      
      <h1 className="text-xl font-black text-white tracking-[0.15em] uppercase mb-12 border-b border-gray-800 pb-6 w-full max-w-7xl">
        LOGIN
      </h1>

      <div className="bg-neutral-900 rounded-2xl shadow-2xl border border-white/5 overflow-hidden w-full max-w-7xl">
        
        {error && (
          <div className="bg-red-500/10 border-l-4 border-[#cc0000] p-4 m-8 mb-0">
            <p className="text-[#cc0000] text-xs font-bold tracking-widest">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 p-8 sm:p-12 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          
          {/* LOG IN SECTION */}
          <div className="flex flex-col gap-6 md:pr-10">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-4">LOG IN</h2>
            
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-600" />
                  </div>
                  <input type="email" name="email" value={loginForm.email} onChange={handleLoginChange} placeholder="enter email" className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input type="password" name="password" value={loginForm.password} onChange={handleLoginChange} placeholder="enter password" className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" disabled={loading} className="w-full bg-[#cc0000] text-white font-bold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50">
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <Link to="/forgot-password" className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-yellow-500 transition-colors w-fit">
              Forgot your password ?
            </Link>

            <div className="relative flex items-center py-2">
              <div className="grow border-t border-gray-800"></div>
              <span className="shrink-0 px-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase">OR</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            <button type="button" onClick={() => handleGoogleSignIn()} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest text-xs uppercase px-12 py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50">
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </div>

          {/* REGISTER SECTION */}
          <div className="flex flex-col gap-6 pt-12 md:pt-0 md:pl-10">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-4">REGISTER</h2>
            
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FULL NAME:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-600" />
                  </div>
                  <input type="text" name="fullName" value={registerForm.fullName} onChange={handleRegisterChange} className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-600" />
                  </div>
                  <input type="email" name="email" value={registerForm.email} onChange={handleRegisterChange} className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">MOBILE:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-600" />
                  </div>
                  <input type="tel" name="mobile" value={registerForm.mobile} onChange={handleRegisterChange} className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input type="password" name="password" value={registerForm.password} onChange={handleRegisterChange} className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">CONFIRM PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input type="password" name="confirmPassword" value={registerForm.confirmPassword} onChange={handleRegisterChange} className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors" required />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" disabled={loading} className="w-full bg-[#cc0000] text-white font-bold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50">
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>
            </form>

            <div className="relative flex items-center py-2 mt-2">
              <div className="grow border-t border-gray-800"></div>
              <span className="shrink-0 px-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase">OR</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            <button type="button" onClick={() => handleGoogleSignIn()} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest text-xs uppercase px-12 py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50">
              <FcGoogle className="text-xl" />
              Register with Google
            </button>

            <p className="text-[10px] tracking-wider text-gray-500 leading-relaxed mt-4">
              By clicking on 'Register' above you agree that you accept the <a href="/terms" className="font-bold text-gray-300 hover:text-yellow-500">Terms of Use</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;