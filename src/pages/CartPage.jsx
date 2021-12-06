import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Row,Input, Button, FormGroup, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart } from '../redux/action';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ongkir : 0
          }
    }

    printCart = () => {
        return this.props.cart.map((item, index) => {
            return (
                <div className="row shadow p-1 mb-3 bg-white rounded" >
                    <div className="col-md-2">
                        <img src={item.images} width="100%" />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{item.nama}</h5>
                        <h4 style={{ fontWeight: 'bolder' }}>Rp {item.harga.toLocaleString()}</h4>
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <h5 style={{ fontWeight: 'bolder' }}>{item.type}</h5>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtDec(index)}>
                                        remove
                                    </span>
                                    <Input placeholder="qty" value={item.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtInc(index)}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h4>Rp {(item.harga * item.qty).toLocaleString()}</h4>
                        </div>
                        <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.btRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    onBtInc = (index) => {
        let temp = [...this.props.cart];
        temp[index].qty += 1

        this.props.updateUserCart(this.props.iduser,temp)
    }

    onBtDec = (index) => {
        let temp = [...this.props.cart]
        
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            temp.splice(index,1)  
        }

        this.props.updateUserCart(this.props.iduser,temp)

        
    }

    btRemove = (index) => {
        let temp = [...this.props.cart]
        temp.splice(index,1)

        // axios.patch(`${API_URL}/akun/${this.props.iduser}`, {
        //     cart: temp
        // })
        // .then((Response) => {
        //     this.props.updateUserCart(Response.data.cart)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        this.props.updateUserCart(this.props.iduser,temp)
    }

    totalPayment = () => {
        let total = 0
        this.props.cart.forEach((item,index) => {
            total += item.harga * item.qty
        })
       

        return total + this.state.ongkir
    }

    onBtCheckOut = () => {
        // yang disimpan = iduser, username, invoice=#INV/Date getTime(), date, note, total_payment, detail=array, status="menunggu konfirmasi"
        let {iduser,username,cart} = this.props

        let tanggal = new Date()
        let invoice = tanggal.getTime()
        //let date = tanggal.getDate() + "-" + (tanggal.getMonth() + 1) + "-" + tanggal.getFullYear()
        //let total = this.totalPayment() + Number(this.ongkir.value)

        let data = {
            iduser: iduser,
            username: username,
            invoice: `#INV/${invoice}`,
            date: tanggal.toLocaleString(),
            note: this.note.value,
            totalPayment : this.totalPayment(),
            ongkir: Number(this.state.ongkir),
            detail: [...cart],
            status: "Menunggu Konfirmasi"
        }

        axios.post(`${API_URL}/userTransactions`,data)
        .then((response) => {
            console.log(response.data)
            this.note.value = null
            this.props.updateUserCart(this.props.iduser, [])
            this.setState({
                ongkir: 0
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    

    render() {
        return (<div>
            <h1 className="text-center mt-5">Keranjang Belanja</h1>
            <div className="row m-1">
                <div className="col-8">
                    {this.printCart()}
                </div>
                <div className="col-4">
                    <div className="shadow p-4 mb-3 bg-white rounded">
                        <h3 style={{}}>Total Payment</h3>
                        <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().toLocaleString()}</h2>
                        <FormGroup>
                            <Label for="ongkir">Biaya Pengiriman</Label>
                            <Input type="text" id="ongkir" onChange={(event) => this.setState({ongkir: Number(event.target.value)})} defaultValue={0}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="note">Notes</Label>
                            <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        iduser: state.userReducer.id,
        username: state.userReducer.username,
        productList: state.productReducer.productList
    }
}
export default connect(mapToProps, {updateUserCart}) (CartPage);