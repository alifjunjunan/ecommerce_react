import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductManagementPage from './pages/ProductManagementPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <NavbarComponent/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth-page" element={<AuthPage/>} />
          <Route path="/product-management-page" element={<ProductManagementPage/>} />
        </Routes>
      </div>
     );
  }
}
 
export default App;
