import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// 1. Import Redux Provider and your Store
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

// 2. NEW: Import Google OAuth Provider & Toaster
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Wrap the app in the Google Provider */}
    <GoogleOAuthProvider clientId="760405296967-o8okb01pjd6ukg0ke6gcfohdj4ejq194.apps.googleusercontent.com">
      <BrowserRouter>
        <Provider store={store}>
          <App />
          
          {/* Global Toast Container styled for the Reyal Storefront Theme */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                borderRadius: '8px'
              },
              success: {
                iconTheme: {
                  primary: '#eab308', // Matches your yellow-500 hover states
                  secondary: '#1a1a1a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#cc0000', // Matches your Reyal brand red
                  secondary: '#fff',
                },
              },
            }}
          />
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)