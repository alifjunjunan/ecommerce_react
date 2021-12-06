import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import { API_URL } from '../helper';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            transaksi: []
         }
    }

    componentDidMount() {
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((response) => {
            this.setState({
                transaksi: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    printHistory = () => {
        return this.state.transaksi.map((item,index) => {
            return (
                <div className="shadow pb-3 rounded">
                    <div className="shadow-sm p-2 bg-dark rounded" style={{ color: "white" }}>
                        <span>{item.date} <Badge color="warning">{item.status}</Badge></span><b style={{ marginLeft: 20 }}>{item.invoice}</b>
                    </div>
                    <div className="row p-3">
                        <div className="col-md-1">
                            <img src={item.detail[0].images} width="100%" alt="" />
                        </div>
                        <div className="col-md-8 d-flex flex-column justify-content-center" style={{ borderRight: "1px solid grey" }}>
                            <h4 style={{ fontWeight: "bolder" }}>{item.detail[0].nama}</h4>
                            <p className="text-muted">{item.detail[0].qty} x {item.detail[0].harga.toLocaleString()}</p>
                            <a className="text-muted" style={{ cursor: "pointer", textDecoration: "none"  }}>+{item.detail.length - 1} produk lainnya</a>
                        </div>
                        <div className="col-md-3">
                            <p className="text-muted">Total Belanja</p>
                            <h4 style={{ fontWeight: "bolder" }}>Rp. {item.totalPayment.toLocaleString()}</h4>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button color="danger">Batalkan Pesanan</Button>
                        <Button color="primary" outline style={{ border: "none" }}>Lihat Detail Produk</Button>
                    </div>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div className="container pt-3">
                <h1>Histori Transaksi Anda</h1>
                {this.printHistory()}
            </div>
         );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role
    }
}
 
export default connect(mapToProps) (HistoryPage);