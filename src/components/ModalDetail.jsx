import React from 'react'
import { Button, Input, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap';

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalDisable: true,
            buttonDetail: "edit"
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
    render() { 
        return ( 
            <Modal isOpen={this.props.modalOpen}>
                <ModalHeader >
                    Detail Product
                </ModalHeader>
                <ModalBody>
                   <Form>
                       <FormGroup>
                           <Label>Nama Product</Label>
                           <Input type="text" defaultValue={this.props.products.nama} disabled={this.state.modalDisable} />
                       </FormGroup>
                       <FormGroup>
                           <Label>Deskripsi Product</Label>
                           <Input type="textarea" defaultValue={this.props.products.deskripsi} disabled={this.state.modalDisable}/>
                       </FormGroup>
                       <Row>
                           <div className="col-6">
                            <FormGroup>
                                <Label>Brand Product</Label>
                                <Input type="text" defaultValue={this.props.products.brand} disabled={this.state.modalDisable}/>
                            </FormGroup>
                           </div>
                           <div className="col-6">
                           <FormGroup>
                                <Label>Kategori Product</Label>
                                <Input type="text" defaultValue={this.props.products.kategori} disabled={this.state.modalDisable}/>
                            </FormGroup>
                           </div>
                       </Row>
                       <FormGroup>
                            <Label>Harga Product</Label>
                            <Input type="number" defaultValue={this.props.products.harga} disabled={this.state.modalDisable}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Stock Product</Label>
                            <Row>
                                <div className="col">
                                    <Input type="text" className="mb-2" defaultValue={this.props.products.stock[0].type} disabled={this.state.modalDisable}/>
                                    <Input type="text" defaultValue={this.props.products.stock[1].type} disabled={this.state.modalDisable}/>
                                </div>
                                <div className="col">
                                    <Input type="number" className="mb-2" defaultValue={this.props.products.stock[0].qty} disabled={this.state.modalDisable}/>
                                    <Input type="number" defaultValue={this.props.products.stock[1].qty} disabled={this.state.modalDisable}/>
                                </div>
                                <div className="col">
                                    <Button type="button" className="mb-2" outline>Delete</Button>
                                    <Button type="button" outline>Delete</Button>
                                </div>
                            </Row>
                        </FormGroup>
                        <Row>
                            <div className="col">
                            <FormGroup>
                                    <Label>Images Product</Label>
                                    <Input type="text" className="mb-2" defaultValue={this.props.products.images[0]} disabled={this.state.modalDisable}/>
                                    <Input type="text" defaultValue={this.props.products.images[1]} disabled={this.state.modalDisable}/>
                                </FormGroup>
                            </div>
                        </Row>
                   </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.btDisableInput}>{this.state.buttonDetail}</Button>
                    <Button type="button" onClick={this.props.btCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
         );
    }
}
 
export default ModalDetail;