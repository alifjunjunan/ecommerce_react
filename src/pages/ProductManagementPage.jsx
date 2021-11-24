import axios from 'axios';
import React from 'react'
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import ModalDetail from '../components/ModalDetail';

class ProductManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            modalOpen: false,
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
        })
        .catch((err) => {
            console.log(err)
        })
    }

    btDetail = (idx) => {
        this.setState({
            selectedIdx: idx,
            modalOpen: true,
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
                    <td><Button type="button" color="info" style={{ color: "white" }} onClick={() => this.btDetail(index)} >Detail</Button> <Button type="button" color="danger">Delete</Button></td>
                </tr>
            )
        })

    }

    

    render() { 
        return ( 
            <Container className="mt-2">
                <h2 className="text-center" style={{ fontWeight: "bold" }}>Product Management</h2>
                <hr />
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
                        modalOpen={this.state.modalOpen}
                        btCancel={() => this.setState({selectedIdx: null})}
                    /> : null
                }
            </Container>
         );
    }
}
 
export default ProductManagementPage;