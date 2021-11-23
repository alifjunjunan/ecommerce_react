import React from 'react'
import axios from 'axios';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            konfirPassword: "",
            username: "",
            role: "",
            loginEmail: "",
            loginPassword: "",
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
        axios.get(`http://localhost:2000/akun`)
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
        
        password == konfirPassword ? axios.post(`http://localhost:2000/akun`,{email,password,username,role: "user"})
        .then((response) => {
            this.getData()
            this.setState({
                email: "",
                password: "",
                username: "",
                konfirPassword: ""
            })
            alert(`Akun berhasil didaftarkan`)
        })
        .catch((err) => {
            console.log(err)
        }) : alert(`data ada yang salah, silahkan cek kembali`)
        

    }

    btLogin = () => {
    
    let {loginEmail,loginPassword,akun} = this.state
    
    let dataLogin = akun.filter((item,index) => {
        return item.email == loginEmail && item.password == loginPassword
    })

    dataLogin.length != 0 && dataLogin[0].email == loginEmail && dataLogin[0].password == loginPassword ? axios.get(`http://localhost:2000/akun?email=${dataLogin[0].email}&id=${dataLogin[0].id}`)
    .then((response) => {
        this.getData()
        this.setState({
            loginEmail: "",
            loginPassword: ""
        })
        alert(`berhasil ! selamat datang ${dataLogin[0].username}`)
    })
    .catch((err) => {
        console.log(err)
    }) : alert(`data anda salah`)
         this.setState({
            loginEmail: "",
            loginPassword: ""
         })
    }
    
    render() { 
        return ( 
            <div>
                <div className="container mt-5">
                    <div>
                        <h2 className="text-center">Pilihan Masuk</h2>
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
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" onChange={(event) => this.handleInput(event.target.value,"loginPassword")} value={this.state.loginPassword}/>
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
 
export default AuthPage;