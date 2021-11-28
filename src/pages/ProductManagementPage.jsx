import axios from 'axios';
import React from 'react'
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import ModalDetail from '../components/ModalDetail';
import { addProductAction } from '../redux/action/productAction';
import { connect } from 'react-redux';
import ModalAdd from '../components/ModalAdd';

const API_URL = "http://localhost:2000"

class ProductManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            modalDetail: false,
            modalAdd: false,
            selectedIdx: null

         }
    }

    componentDidMount = () => {
        this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:2000/products`)
        .then((response) => {
            this.setState({
                products: response.data
            })
            
            this.props.addProductAction(response.data[0])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    btDetail = (idx) => {
        this.setState({
            selectedIdx: idx,
            modalDetail: true,
        })
    }


    printData = () => {

        return this.state.products.map((item,index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.brand}</td>
                    <td>{item.kategori}</td>
                    <td><img src={item.images[0]} width="100px" height="100px" alt="product" /></td>
                    <td>{item.harga}</td>
                    <td><Button type="button" color="info" style={{ color: "white" }} onClick={() => this.btDetail(index)} >Detail</Button> <Button type="button" color="danger" onClick={() => this.btDeleteProduct(index)}>Delete</Button></td>
                </tr>
            )
        })

    }

    btDeleteProduct = (idx) => {
        let {products} = this.state

        axios.delete(`${API_URL}/products/${products[idx].id}`)
        .then((response) => {
            this.getData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    

    render() { 
        return ( 
            <Container className="mt-2">
                <h2 className="text-center" style={{ fontWeight: "bold" }}>Product Management</h2>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button type="button" color="success" onClick={() => this.setState({modalAdd: true})}>Add</Button>
                </div>
                <ModalAdd
                    
                    modalAdd={this.state.modalAdd}
                    btClose={() => this.setState({ modalAdd: !this.state.modalAdd})}
                />
                <Row className="mt-4">
                    <Table>
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Kategori</th>
                            <th scope="col">Gambar</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printData()}
                        </tbody>
                    </Table>
                </Row>
                {
                    this.state.products.length > 0 && this.state.selectedIdx != null ? 
                    <ModalDetail
                        btDetail={this.btDetail}
                        products={this.state.products[this.state.selectedIdx]}
                        modalDetail={this.state.modalDetail}
                        btCancel={() => this.setState({modalDetail: !this.state.modalDetail})}
                    /> : null
                }
                
            </Container>
         );
    }
}

 
export default connect(null,{addProductAction}) (ProductManagementPage);