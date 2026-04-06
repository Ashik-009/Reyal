import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { auth, db } from '../firebase'; 
import { FaLock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
// 1. Import the multi-colored Google icon!
import { FcGoogle } from 'react-icons/fc'; 
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

  // --- STANDARD LOGIN ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- GOOGLE SIGN-IN / REGISTER ---
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: user.displayName || 'Google User',
        email: user.email,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      navigate('/');
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
      console.error(err);
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
      const userCredential = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: registerForm.fullName,
        email: registerForm.email,
        mobile: registerForm.mobile,
        createdAt: new Date().toISOString()
      });

      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Email may already be in use.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
          
          {/* =========================================
              LOG IN SECTION (LEFT)
          ========================================= */}
          <div className="flex flex-col gap-6 md:pr-10">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-4">LOG IN</h2>
            
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-600" />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    value={loginForm.email} 
                    onChange={handleLoginChange} 
                    placeholder="enter email"
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    value={loginForm.password} 
                    onChange={handleLoginChange} 
                    placeholder="enter password"
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#cc0000] text-white font-bold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <Link to="/forgot-password" className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-yellow-500 transition-colors w-fit">
              Forgot your password ?
            </Link>

            {/* Google Login Button */}
            <div className="relative flex items-center py-2">
              <div className="grow border-t border-gray-800"></div>
              <span className="shrink-0 px-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase">OR</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest text-xs uppercase px-12 py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {/* 2. Swapped for FcGoogle and made it a bit bigger */}
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </div>

          {/* =========================================
              REGISTER SECTION (RIGHT)
          ========================================= */}
          <div className="flex flex-col gap-6 pt-12 md:pt-0 md:pl-10">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-4">REGISTER</h2>
            
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FULL NAME:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-gray-600" />
                  </div>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={registerForm.fullName} 
                    onChange={handleRegisterChange} 
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-600" />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    value={registerForm.email} 
                    onChange={handleRegisterChange} 
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">MOBILE:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-600" />
                  </div>
                  <input 
                    type="tel" 
                    name="mobile" 
                    value={registerForm.mobile} 
                    onChange={handleRegisterChange} 
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input 
                    type="password" 
                    name="password" 
                    value={registerForm.password} 
                    onChange={handleRegisterChange} 
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">CONFIRM PASSWORD:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-gray-600" />
                  </div>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={registerForm.confirmPassword} 
                    onChange={handleRegisterChange} 
                    className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#cc0000] text-white font-bold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Register'}
                </button>
              </div>
            </form>

            {/* Google Register Button */}
            <div className="relative flex items-center py-2 mt-2">
              <div className="grow border-t border-gray-800"></div>
              <span className="shrink-0 px-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase">OR</span>
              <div className="grow border-t border-gray-800"></div>
            </div>

            <button 
              type="button" 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold tracking-widest text-xs uppercase px-12 py-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {/* 3. Swapped here as well */}
              <FcGoogle className="text-xl" />
              Register with Google
            </button>

            <p className="text-[10px] tracking-wider text-gray-500 leading-relaxed mt-4">
              By clicking on 'Register' above you agree that you accept the <a href="#" className="font-bold text-gray-300 hover:text-yellow-500">Terms of Use</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;