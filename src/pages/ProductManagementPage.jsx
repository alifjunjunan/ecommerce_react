import axios from 'axios';
import React from 'react'
import { Button, ButtonGroup, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import ModalDetail from '../components/ModalDetail';
import { getProductAction } from '../redux/action/productAction';
import { connect } from 'react-redux';
import ModalAdd from '../components/ModalAdd';
import { API_URL } from '../helper';




class ProductManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            modalDetail: false,
            modalAdd: false,
            selectedIdx: null,
            thumnailIdx: 0,
            page: 1

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
            
            //this.props.getProductAction()
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
        let {page} = this.state
        return this.state.products.slice(page > 1 ? (page - 1) * 5 : page - 1, page * 5).map((item,index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.brand}</td>
                    <td>{item.kategori}</td>
                    <td>{
                            this.state.selectedIdx == index
                            ?
                            <img src={item.images[this.state.thumnailIdx]} width="150px" height="150px" alt="product" />
                            :
                            <img src={item.images[0]} width="150px" height="150px" alt="product" />
                        }
                        <div className="mt-2">
                            {
                                item.images.map((item,idx) => {
                                    return <img src={item} width="10%" className="mr-2" alt={item.nama} onClick={() => this.setState({thumnailIdx: idx, selectedIdx: index})} />

                                })
                            }
                        </div>
                    </td>
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

    // printBtPagination = () => {
    //    let btn = []

    //    for (let i = 0; i < Math.ceil(this.state.products.length / 8); i++) {
           
    //         btn.push(<Button outline color="primary" disabled={this.state.page == i + 1 ? true : false} onClick={() => this.setState({page: i + 1})}>{i +1}</Button>)
           
    //        return btn   
    //    }
    // }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.products.length / 5); i++ ) {
           btn.push(<Button outline color="primary" disabled={this.state.page == i + 1 ? true : false} onClick={() => this.setState({page: i + 1})}>{i+1}</Button>)
        }

        return btn

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
                    getData={this.getData}
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
                        <tfoot>
                        </tfoot>
                    </Table>
                </Row>
                    <div className="my-5 text-center">
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                    </div>
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

 
export default connect(null,{getProductAction}) (ProductManagementPage);