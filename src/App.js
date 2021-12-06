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
import { loginAction,getProductAction } from './redux/action';
import ProductPages from './pages/ProductPages';
import ProductDetail from './pages/ProductDetail';
import {API_URL} from './helper'
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFound';
import HistoryPage from './pages/HistoryPage';
import TransactionAdminPage from './pages/TransactionManagement';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading: true
     }
  }

  componentDidMount() {
    this.keepLogin()
    this.props.getProductAction()
  }

  keepLogin = async () => {
    try {
      let local = localStorage.getItem("data")
      if (local) {
        // axios.get(`${API_URL}/akun?email=${local.email}&password=${local.password}`)
        // .then((respon) => {
        //   console.log("keepLogin berhasil ==>", respon.data)
        //   this.props.loginAction(respon.data[0]) 
        //   this.setState({
        //     loading: false
        //   }) 
        // })
        // .catch((err) => {
        //   console.log(err)
        // })
  
        //console.log(local)
        // re-assign variable local dengan JSON parse
        local = JSON.parse(local)
        let res = await this.props.loginAction(local.email, local.password)
        if (res.success) {
          this.setState({loading: false})
        }
      } else {
        this.setState({loading: false})
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // getProduct = async () => {
  //   axios.get(`${API_URL}/products`)
  //   .then((response) => {
  //     this.props.getProductAction(response.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
    
  // }

  render() { 
    return ( 
      <div>
        <NavbarComponent  loading={this.state.loading}/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/auth-page" element={<AuthPage/>} />
          <Route path="/product-detail" element={<ProductDetail/>} />
          <Route path="/products" element={<ProductPages/>} />
          {
            this.props.role == "user"
            ?
            <>
               <Route path="/cart-user" element={<CartPage/>} />
               <Route path="/history-user" element={<HistoryPage/>} />
            </>
            : this.props.role == "admin" ?
            <>
               <Route path="/product-management-page" element={<ProductManagementPage/>} />
               <Route path="/transaction-management-page" element={<TransactionAdminPage/>} />
            </>
            :
            <Route path="*" element={<NotFoundPage/>} />
          }

          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
     );
  }
}

const mapToProps = (state) => {
  return {
      role : state.userReducer.role
  }
}
 
export default connect(mapToProps,{loginAction, getProductAction}) (App);
