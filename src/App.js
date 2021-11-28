import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductManagementPage from './pages/ProductManagementPage';
import axios from 'axios';
import { connect } from 'react-redux';
import { loginAction } from './redux/action';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = () => {
    let local = JSON.parse(localStorage.getItem("data")) 
    if (local) {
      axios.get(`http://localhost:2000/akun?email=${local.email}&password=${local.password}`)
      .then((respon) => {
        console.log("keepLogin berhasil ==>", respon.data)
        this.props.loginAction(respon.data[0])
      })
      .catch((err) => {
        console.log(err)
      })

    }
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
 
export default connect(null,{loginAction}) (App);
