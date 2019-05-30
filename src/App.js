import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import routes from './routes'

function App() {
  return (
    <HashRouter>
      <Navbar />
      {routes}
    </HashRouter>
  );
}

export default App;
