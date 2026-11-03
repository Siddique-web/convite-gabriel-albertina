import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

async function loadInviteFonts() {
  const loads = [
    document.fonts.load('700 1.25rem "Playfair Display"'),
    document.fonts.load('600 1rem "Lora"'),
    document.fonts.load('700 1rem "Montserrat"'),
    document.fonts.load('400 3rem "Great Vibes"'),
    document.fonts.load('400 3rem "Great Vibes"'),
  ]
  await Promise.allSettled(loads)
  await document.fonts.ready
  document.documentElement.classList.add('fonts-loaded')
}

loadInviteFonts()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
