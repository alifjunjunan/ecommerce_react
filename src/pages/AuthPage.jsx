import React from 'react'
import axios from 'axios';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { loginAction } from '../redux/action';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { API_URL } from '../helper';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            konfirPassword: "",
            username: "",
            loginEmail: "",
            loginPassword: "",
            logPassShow: "Show",
            logPassType: "password",
            regPassShow: "Show",
            regPassType: "password",
            toastOpen: false,
            toastHeader: "",
            toastmessage: "",
            toastIcon: "",
            akun: []
         }
    }

    
    componentDidMount() {
        this.getData()
    }
    
    handleInput = (value,propState) => {
        this.setState({
            [propState]: value
        })
    }
    
    getData = () => {
        axios.get(`${API_URL}/akun`)
        .then((response) => {
            //console.log(response.data)
            this.setState({
                akun: response.data
            })
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    btDaftar = () => {
        let {email,password,konfirPassword,username} = this.state
        
        // password == konfirPassword ? axios.post(`http://localhost:2000/akun`,{email,password,username,role: "user"})
        // .then((response) => {
        //     this.getData()
        //     this.setState({
        //         email: "",
        //         password: "",
        //         username: "",
        //         konfirPassword: ""
        //     })
        //     alert(`Akun berhasil didaftarkan`)
        // })
        // .catch((err) => {
        //     console.log(err)
        // }) : alert(`data ada yang salah, silahkan cek kembali`)

        if(username == "" || email == "" || password == "" || konfirPassword == "") {
            this.setState({
                toastOpen: true,
                toastHeader: "Register Warning",
                toastIcon: "warning",
                toastmessage: "Lengkapi semua data"
            })
        } else {
            if (password == konfirPassword) {
                if (email.includes("@")) {
                    axios.post(`${API_URL}/akun`,{email,password,username,role: "user",status: "active"})
                .then((response) => {
                    this.getData()
                    this.setState({
                        email: "",
                        password: "",
                        username: "",
                        konfirPassword: "",
                        toastOpen: true,
                        toastHeader: "Register succes",
                        toastIcon: "success",
                        toastmessage: "registrasi berhasil"
                    })
                    
        })
        .catch((err) => {
            console.log(err)
        })
                } else {
                    this.setState({
                        toastOpen: true,
                        toastHeader: "Register Warning",
                        toastIcon: "warning",
                        toastmessage: "Email Salah"
                    })
                }
            } else {
                this.setState({
                    toastOpen: true,
                    toastHeader: "Register Warning",
                    toastIcon: "warning",
                    toastmessage: "Password tidak sesuai"
                })
            }
        }
        

    }

    btLogin = () => {
    
    // let {loginEmail,loginPassword,akun} = this.state
    
    // let dataLogin = akun.filter((item,index) => {
    //     return item.email == loginEmail && item.password == loginPassword
    // })

    // dataLogin.length != 0 && dataLogin[0].email == loginEmail && dataLogin[0].password == loginPassword ? axios.get(`${API_URL}/akun?email=${dataLogin[0].email}&id=${dataLogin[0].id}`)
    // .then((response) => {
    //     this.getData()
    //     this.setState({
    //         loginEmail: "",
    //         loginPassword: ""
    //     })
    //     localStorage.setItem("data", JSON.stringify(response.data[0]));
    //     alert(`berhasil ! selamat datang ${dataLogin[0].username}`)
    //     console.log("response login =>", response.data)
    //     this.props.loginAction(response.data[0])
    // })
    // .catch((err) => {
    //     console.log(err)
    // }) : alert(`data anda salah`)
    //      this.setState({
    //         loginEmail: "",
    //         loginPassword: ""
    //      })

    this.props.loginAction(this.state.loginEmail, this.state.loginPassword)

    }

    showHidePasswordLogin = () => {
        if (this.state.logPassType == "password") {
            this.setState({
                logPassShow: "Hide",
                logPassType: "text"
            })
        } else {
            this.setState({
                logPassShow: "Show",
                logPassType: "password"
            })
        }
    }
    
    render() { 
        if (this.props.iduser) {
            // redirect ke page yang dituju
            return <Navigate to="/"/>
        }
        return ( 
            <div>
                <div className="container mt-5">
                    <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed" }}>
                        <ToastHeader icon={this.state.toastIcon} toggle={() => this.setState({toastOpen: false})}>
                                {this.state.toastHeader}
                        </ToastHeader>
                        <ToastBody>
                                {this.state.toastmessage}
                        </ToastBody>
                    </Toast>
                    </div>
                    
                    <div>
                        <h2 className="text-center font-weight-bold">Pilihan Masuk</h2>
                        <p className="text-center">Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                    </div>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6">
                                    <h4>Silahkan masuk ke akun Anda</h4>
                                    <p>silahkan masuk ke akun anda untuk menyelesaikan pembayaran dengan data pribadi anda</p>
                                    <form action="">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" onChange={(event) => this.handleInput(event.target.value,"loginEmail")} value={this.state.loginEmail} />
                                        </div>
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group">
                                            <input type={this.state.logPassType} className="form-control" onChange={(event) => this.handleInput(event.target.value,"loginPassword")} value={this.state.loginPassword}/>
                                            <div className="input-group-append">
                                                <span className="input-group-text" style={{ cursor: "pointer" }} onClick={this.showHidePasswordLogin}>{this.state.logPassShow}</span>
                                            </div>
                                        </div>
                                        <div className="form-group mt-3">
                                            <button type="button" className="form-control btn btn-primary btn-block text-center" onClick={this.btLogin}>masuk</button>
                                        </div>
                                    </form>
                            </div>
                            <div className="col-md-6">
                                <h4>Silahkan buat akun Anda</h4>
                                <form action="">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" onChange={(event) => this.handleInput(event.target.value,"username")} value={this.state.username}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" onChange={(event) => this.handleInput(event.target.value,"email")} value={this.state.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" onChange={(event) => this.handleInput(event.target.value,"password")} value={this.state.password} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordConfirmation">Confirmation Password</label>
                                        <input type="password" className="form-control"  onChange={(event) => this.handleInput(event.target.value,"konfirPassword")} value={this.state.konfirPassword} />
                                    </div>
                                    <div className="form-group mt-3">
                                            <button type="button" className="form-control btn btn-primary btn-block text-center" onClick={this.btDaftar}>Daftar</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id
    }
}
 
export default connect(mapToProps,{loginAction}) (AuthPage);