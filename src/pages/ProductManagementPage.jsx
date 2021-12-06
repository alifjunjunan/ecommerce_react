import axios from 'axios';
import React from 'react'
import { Button, ButtonGroup, Container, FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';
import ModalDetail from '../components/ModalDetail';
import { getProductAction } from '../redux/action/productAction';
import { connect } from 'react-redux';
import ModalAdd from '../components/ModalAdd';
import { sortProductAction } from '../redux/action';
import { API_URL } from '../helper';




class ProductManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: [],
            detailProduct: {},
            modalDetail: false,
            modalAdd: false,
            selectedIdx: null,
            thumnailIdx: 0,
            limitdata: "4",
            page: 1

         }
    }

    componentDidMount = () => {
        this.getData()
        this.props.getProductAction()
       
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
    

    printData = () => {
        let {page,limitdata} = this.state
        return this.props.productList.slice(page > 1 ? (page - 1) * limitdata : page - 1, page * limitdata).map((item,index) => {
            return (
                <tr>
                    <td>{page > 1 ? (page - 1) * limitdata + index + 1 : index + 1}</td>
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
                    <td><Button type="button" size="sm" color="info" style={{ color: "white" }} onClick={() => this.setState({detailProduct: item, modalDetail: true})} >Detail</Button> <Button type="button" size="sm" color="danger" onClick={() => this.btDeleteProduct(item.id)}>Delete</Button></td>
                </tr>
            )
        })
        

    }

    btDeleteProduct = (id) => {

        axios.delete(`${API_URL}/products/${id}`)
        .then((response) => {
            this.getData()
            this.props.getProductAction()
            
        })
        .catch((err) => {
            console.log(err)
        })
    }


    printBtPagination = () => {
        let btn = []
        let {limitdata} = this.state
        for (let i = 0; i < Math.ceil(this.props.productList.length / limitdata); i++ ) {
           btn.push(<Button outline color="primary" disabled={this.state.page == i + 1 ? true : false} onClick={() => this.setState({page: i + 1})}>{i+1}</Button>)
        }

        return btn

    }

    
    limitData = (event) => {
        this.setState({
            limitdata: event.target.value,
            page: 1
        })
    }

    handleSort = (event) => {
        this.props.sortProductAction({
            field: event.target.value.split('-')[0],
            sortType: event.target.value.split('-')[1]
        })
    }

    btFilter = ( ) => {
        this.props.getProductAction({
            nama: this.inNama.value,
            hargaMax: this.inMaximum.value,
            hargaMin: this.inMinimum.value
        })

        this.setState({
            page: 1
        })
    }

    btReset = () => {
        this.inNama.value = null
        this.inMaximum.value = null
        this.inMinimum.value = null 

        this.props.getProductAction()
    }

    render() { 
        return ( 
            <Container className="mt-2">
                <h2 className="text-center" style={{ fontWeight: "bold" }}>Product Management</h2>
                <hr />
                {/* <div className="d-flex justify-content-end">
                    <Button type="button" color="success" onClick={() => this.setState({modalAdd: true})}>Add</Button>
                </div> */
                console.log("isi modal detail =>",this.state.modalDetail)}
                <ModalAdd
                    
                    modalAdd={this.state.modalAdd}
                    btClose={() => this.setState({ modalAdd: !this.state.modalAdd})}
                    getData={this.getData}
                />
                <div className="d-flex flex-wrap ml-2">
                <Row className="mt-4 col-xl-4 col-md-12 order-sm-0 order-0">
                    <div className=" mt-2 ">
                       <div className="container shadow p-3 mb-4 rounded">
                         <Button type="button" block="true" color="success" onClick={() => this.setState({modalAdd: true})}>Add</Button>
                         <div className="mt-2">
                             <FormGroup>
                                 <Label>Nama</Label>
                                 <Input type="text" innerRef={(elemen) => this.inNama = (elemen)} placeholder="cari produk"/>
                             </FormGroup>
                             <FormGroup>
                                 <Label>Harga</Label>
                                 <InputGroup>
                                    <Input type="number" placeholder="Minimum" innerRef={(elemen) => this.inMinimum = (elemen)}/>
                                    <Input type="number" placeholder="Maximum" innerRef={(elemen) => this.inMaximum = (elemen)}/>
                                 </InputGroup>
                             </FormGroup>
                             <FormGroup>
                                 <Label>Sort</Label>
                                 <Input type="select" onChange={this.handleSort}>
                                     <option value="harga-asc">Harga Asc</option>
                                     <option value="harga-desc">Harga Desc</option>
                                     <option value="nama-asc">A - Z</option>
                                     <option value="nama-desc">Z - A</option>
                                     <option value="id-asc">Reset</option>
                                 </Input>
                             </FormGroup>
                         </div>
                         <div className="d-flex justify-content-end">
                             <Button outline color="warning" style={{ marginRight: "1vw" }} onClick={this.btReset}>Reset</Button>
                             <Button color="primary" onClick={this.btFilter}>Filter</Button>
                         </div>
                       </div>
                    </div>
                    </Row>
                    <Row className="mx-2 col-xl-8 col-md-12 col-sm-9 order-sm-1 order-1">
                    <div>
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
                    </div>
                </Row>
                </div>
                    <div className="my-5 text-center">
                    <ButtonGroup>
                    <Input type="select" style={{ marginRight: "1vw" }} onChange={this.limitData}>
                        <option value="2">2</option>
                        <option selected value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                    </Input>
                        {this.printBtPagination()}
                    </ButtonGroup>
                    </div>
                    <ModalDetail
                       modalDetailOpen={this.state.modalDetail}
                       detailProduct={this.state.detailProduct}
                       btCancel={() => this.setState({modalDetail: !this.state.modalDetail})}
                   />
            </Container>
         );
    }
}

const mapToProps = (state) => {
    return {
        productList: state.productReducer.productList
    }
}

 
export default connect(mapToProps,{getProductAction,sortProductAction}) (ProductManagementPage);