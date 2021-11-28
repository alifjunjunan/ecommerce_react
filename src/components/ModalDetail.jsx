import React from 'react'
import { Button, Input, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col } from 'reactstrap';

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

    printStock = () => {
        
        if (this.props.products.stock){
            return this.props.products.stock.map((item,index) => {
                return(
                    <Row>
                        <Col>
                            <Input type="text" className="mb-2" defaultValue={item.type} disabled={this.state.modalDisable}/>
                        </Col>
                        <Col>
                            <Input type="text" className="mb-2" defaultValue={item.qty} disabled={this.state.modalDisable}/>
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
        if (this.props.products.images) {
            return this.props.products.images.map((item,index) => {
                return (
                    <Row>
                        <Col>
                             <Input type="text" className="mb-2" defaultValue={item} disabled={this.state.modalDisable}/>
                        </Col>
                    </Row>
                )
            })
        }
    }

    render() { 
        return ( 
            <Modal isOpen={this.props.modalDetail}>
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
                            {this.printStock()}
                        </FormGroup>
                        <FormGroup>
                            <Label>Images Product</Label>
                            {this.printImages()}
                        </FormGroup>
                   </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.btDisableInput}>{this.state.buttonDetail}</Button>
                    <Button type="button" onClick={() => {
                        this.setState({modalDisable: true})
                        this.props.btCancel()
                         }}>Cancel</Button>
                </ModalFooter>
            </Modal>
         );
    }
}
 
export default ModalDetail;