import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from "./routes/Routes";
import { AudioProvider } from './context/AudioContext';

import './App.css'

function App() {
  return (
    <>
      <AudioProvider>
        <Router>
          <main>
            <AppRoutes />
          </main>
        </Router>
      </AudioProvider>
    </>
  )
}

export default App;