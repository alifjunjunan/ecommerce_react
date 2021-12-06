import axios from 'axios';
import React from 'react'
import { Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row,Button, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getProductAction } from '../redux/action';

const API_URL = "http://localhost:2000"

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nama: "",
            deskripsi: "",
            brand: "",
            kategori: "",
            harga: 0,
            type: "",
            qty: 0,
            dataImages: "",
            stock: [],
            images: [],
            modalClose: false,
            products: []
          }
    }

    handleInput = (value,propState) => {
        console.log("value=>",value,"props =>",propState)
        this.setState({
            [propState]: value
        })
    }

    handleInputStock = (value,propState,idx) => {
        let {stock} = this.state
        
        stock[idx][propState] = value
        this.setState({
            stock: stock
        })
        
    }
    
    handleInputImages = (value,idx) => {
        let {images} = this.state
        
        images[idx] = value
        this.setState({
            images: images
        })
        
    }

    componentDidMount() {
        this.getData()
    }

    getData=() => {
        axios.get(`${API_URL}/products`)
        .then((response) => {
            this.setState({
                products: response.data
            })
            

        })
        .catch((err) => {
            console.log(err)
        })
    }

    addStock = () => {
        this.state.stock.push({id: null,type: this.state.type, qty: this.state.qty})
        this.setState({
            stock: this.state.stock
        })
        
    }

    addImages = () => {
        this.state.images.push("")
        this.setState({
            images: this.state.images
        })
        

    }

    deleteStock = (idx) => {
        this.state.stock.splice(idx,1)

        this.setState({
            stock: this.state.stock
        })
    }
    
    deleteImages = (idx) => {
        this.state.images.splice(idx,1)

        this.setState({
            images: this.state.images
        })
    }

    printStock = () => {
        if (this.state.stock.length > 0 ) {
            return this.state.stock.map((item,index) => {
                return (
                    <Row className="mt-2">
                    <Col>
                        <Input type="text" placeholder="type" onChange={(event => this.handleInputStock(event.target.value,"type",index))} className="mb-2"/>
                    </Col>
                    <Col>
                        <Input type="text" placeholder="stock" onChange={(event => this.handleInputStock(Number(event.target.value),"qty",index))} className="mb-2" />
                    </Col>
                    <Col>
                        <Button type="button" color="danger" className="mb-2" onClick={() => this.deleteStock(index)} outline>Delete</Button>
                    </Col>
                </Row>
                )
            })
        }
    }

    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item,index) => {
                return (
                    <Row>
                        <Col>
                            <Input type="text" placeholder="images" onChange={(event => this.handleInputImages(event.target.value,index))} className="mb-2"/>
                        </Col>
                        <Col>
                            <Button type="button" color="danger" className="mb-2" outline onClick={() => this.deleteImages(index)}>Delete</Button>
                        </Col>
                    </Row>
                )
            })
        }
    }

    btSubmit = () => {
        Number(this.state.harga)
        let {nama,deskripsi,kategori,brand,harga,stock,images} = this.state
        if (nama == "" || deskripsi == "" || kategori == "" || brand == "" || harga == 0 || stock.length == 0 || images.length == 0 ){
            alert("lengkapi semua data")
        } else {
            axios.post(`${API_URL}/products`,{nama,deskripsi,kategori,brand,harga,stock,images})
            .then((response) => {
                console.log(response.data)
                this.setState({
                nama: "",
                deskripsi: "",
                brand: "",
                kategori: "",
                harga: 0,
                stock: [],
                images: []
                
                })
                this.props.getProductAction()
                this.props.getData()
                this.props.btClose()
                
            })
            .catch((err) => {
                console.log(err)
            })

        }
    }

    
   
    render() { 
        return ( 
            <Modal isOpen={this.props.modalAdd} toggle={this.props.btClose}>
                <ModalHeader toggle={this.props.btClose} >
                    Add Product
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Nama Product</Label>
                            <Input type="text" onChange={(event) => this.handleInput(event.target.value,"nama")} value={this.state.nama}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Deskripsi Product</Label>
                            <Input type="textarea" onChange={(event) => this.handleInput(event.target.value,"deskripsi")} value={this.state.deskripsi}/>
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label>Brand Product</Label>
                                    <Input type="Text" onChange={(event) => this.handleInput(event.target.value,"brand")} value={this.state.brand}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Kategori Product</Label>
                                    <Input type="Text" onChange={(event) => this.handleInput(event.target.value,"kategori")} value={this.state.kategori}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label>Harga Product</Label>
                            <Input type="number" onChange={(event) => this.handleInput(Number(event.target.value),"harga")} value={this.state.harga}/>
                        </FormGroup>
                        <FormGroup>
                            <div className="d-flex justify-content-between">
                                <Label>Stock</Label>
                                <Button color="success" onClick={this.addStock} outline type="button">Add Stock</Button>
                            </div>
                            {this.printStock()}
                        </FormGroup>
                        <hr />
                        <FormGroup>
                        <div className="d-flex justify-content-between">
                            <Label>Images</Label>
                            <Button color="success" outline type="button" onClick={this.addImages}>Add Image</Button>
                        </div>
                        {this.printImages()}
                        </FormGroup>
                    </Form>
                </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="primary"  onClick={this.btSubmit}>Submit</Button>
                        <Button type="button" onClick={() => this.props.btClose()}>Cancel</Button>
                    </ModalFooter>
            </Modal>
         );
    }
}


 
export default connect(null,{getProductAction}) (ModalAdd);