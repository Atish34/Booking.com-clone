import { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import reduxStore from './redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
)
