import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase'; 
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setEmail(''); // Clear the input field after success
    } catch (err) {
      setError('Failed to send reset email. Make sure this email is registered.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-20 px-6 lg:px-12 font-sans flex flex-col items-center">
      
      {/* Page Title */}
      <h1 className="text-xl font-black text-white tracking-[0.15em] uppercase mb-12 border-b border-gray-800 pb-6 w-full max-w-7xl">
        ACCOUNT RECOVERY
      </h1>

      {/* Main Card Container */}
      <div className="bg-neutral-900 rounded-2xl shadow-2xl border border-white/5 overflow-hidden w-full max-w-lg p-8 sm:p-12 mt-8">
        
        <h2 className="text-2xl font-black text-white tracking-[0.1em] uppercase mb-2 text-center">
          RESET PASSWORD
        </h2>
        <p className="text-xs tracking-widest text-gray-400 text-center mb-8 leading-relaxed">
          ENTER YOUR EMAIL ADDRESS BELOW AND WE WILL SEND YOU A LINK TO RESET YOUR PASSWORD.
        </p>

        {/* Global Success / Error Displays */}
        {error && (
          <div className="bg-red-500/10 border-l-4 border-[#cc0000] p-4 mb-6">
            <p className="text-[#cc0000] text-xs font-bold tracking-widest">{error}</p>
          </div>
        )}
        {message && (
          <div className="bg-green-500/10 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-500 text-xs font-bold tracking-widest">{message}</p>
          </div>
        )}

        {/* Reset Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS:</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-600" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your registered email"
                className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg pl-10 px-4 py-3 outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#cc0000] text-white font-bold tracking-[0.2em] text-xs uppercase px-12 py-4 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            Remembered your password?{' '}
            <Link to="/login" className="text-white hover:text-yellow-500 transition-colors ml-1">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;