import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from "./routes/Routes";

import './App.css'

function App() {
  return (
    <>
      <Router>
        <main>
          <AppRoutes />
        </main>
      </Router>
    </>
  )
}

export default App;