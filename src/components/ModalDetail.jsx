import axios from 'axios';
import React from 'react'
import { Button, Input, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductAction } from '../redux/action';
import { connect } from 'react-redux';

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalDisable: true,
            buttonDetail: "edit",
            edit: false,
            stock: [],
            images: []
         }
    }

    btDisableInput = () => {
        if (this.state.modalDisable == true) {
            this.setState({
                modalDisable: false,
                buttonDetail: "save"
            })
        } else {
            this.setState({
                buttonDetail: "edit",
                modalDisable: true
            })
        }
    }

    printStock = () => {
        
        if (this.props.detailProduct.stock){
            return this.props.detailProduct.stock.map((item,index) => {
                return(
                    <Row>
                        <Col>
                            <Input type="text" className="mb-2" defaultValue={item.type} onChange={(event) => this.handleType(event,index)} disabled={!this.state.edit}/>
                        </Col>
                        <Col>
                            <Input type="text" className="mb-2" defaultValue={item.qty} onChange={(event) => this.handleStock(event,index)} disabled={!this.state.edit}/>
                        </Col>
                        <Col>
                            <Button type="button" className="mb-2" outline>Delete</Button>
                        </Col>
                    </Row>
                )
            })
        }
    }

    printImages = () => {
        if (this.props.detailProduct.images) {
            return this.props.detailProduct.images.map((item,index) => {
                return (
                    <Row>
                        <Col>
                             <Input type="text" className="mb-2" defaultValue={item} disabled={!this.state.edit} onChange={(event) => this.handleImages(event, index)}/>
                        </Col>
                    </Row>
                )
            })
        }
    }

    btSave = () => {
        let data = {
            nama: this.inNama.value,
            brand: this.inBrand.value,
            kategori: this.inKategori.value,
            deskripsi: this.inDeskripsi.value,
            harga: Number(this.inHarga.value),
            stock: this.state.stock.length == 0 ? this.props.detailProduct.stock : this.state.stock,
            images: this.state.images.length == 0 ? this.props.detailProduct.images : this.state.images
        }

        console.log("testing data =>", data)
        axios.patch(`${API_URL}/products/${this.props.detailProduct.id}`,data)
        .then((response) => {
            this.props.getProductAction()
            this.props.btCancel()
            this.setState({stock: [], images: [], edit: !this.state.edit})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleImages = (event,index) => {
        let temp = [...this.props.detailProduct.images]
        temp[index] = event.target.value
        this.setState({ images: temp})
    }

    

    handleType = (event, index) => {
        let temp = [...this.props.detailProduct.stock]
        temp[index].type = event.target.value
        this.setState({
            stock: temp
        })
    }
    
    handleStock = (event, index) => {
        let temp = [...this.props.detailProduct.stock]
        temp[index].qty = Number(event.target.value)
        this.setState({
            stock: temp
        })
    }

    render() { 
        let { nama, deskripsi, brand, kategori, harga } = this.props.detailProduct
        return ( 
            <Modal isOpen={this.props.modalDetailOpen} toggle={this.props.btCancel} >
                <ModalHeader toggle={this.props.btCancel} >
                    Detail Product
                </ModalHeader>
                <ModalBody>
                   <Form>
                       <FormGroup>
                           <Label>Nama Product</Label>
                           <Input type="text" defaultValue={nama} innerRef={elemen => this.inNama = elemen}  disabled={!this.state.edit} />
                       </FormGroup>
                       <FormGroup>
                           <Label>Deskripsi Product</Label>
                           <Input type="textarea" defaultValue={deskripsi} innerRef={elemen => this.inDeskripsi = elemen} disabled={!this.state.edit}/>
                       </FormGroup>
                       <Row>
                           <div className="col-6">
                            <FormGroup>
                                <Label>Brand Product</Label>
                                <Input type="text" defaultValue={brand} innerRef={elemen => this.inBrand = elemen} disabled={!this.state.edit}/>
                            </FormGroup>
                           </div>
                           <div className="col-6">
                           <FormGroup>
                                <Label>Kategori Product</Label>
                                <Input type="text" defaultValue={kategori} innerRef={elemen => this.inKategori = elemen} disabled={!this.state.edit}/>
                            </FormGroup>
                           </div>
                       </Row>
                       <FormGroup>
                            <Label>Harga Product</Label>
                            <Input type="number" defaultValue={harga} innerRef={elemen => this.inHarga = elemen} disabled={!this.state.edit}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Stock Product</Label>
                            {this.printStock()}
                        </FormGroup>
                        <FormGroup>
                            <Label>Images Product</Label>
                            {this.printImages()}
                        </FormGroup>
                   </Form>
                </ModalBody>
                <ModalFooter>
                    {/* <Button type="button" color="primary" onClick={this.btDisableInput}>{this.state.buttonDetail}</Button> */}
                    {
                        this.state.edit ?
                            <Button type="button" color="primary" onClick={this.btSave}>Save</Button>
                            : <Button type="button" color="primary" onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
                    }
                    <Button type="button" onClick={() => {
                        this.setState({ edit: !this.state.edit })
                        this.props.btCancel()
                         }}>Cancel</Button>
                </ModalFooter>
            </Modal>
         );
    }
}


 
export default connect(null,{getProductAction}) (ModalDetail);