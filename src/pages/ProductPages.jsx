import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardTitle, Input, ButtonGroup, Button, InputGroup, InputGroupText, FormGroup, Label } from 'reactstrap';
import { getProductAction } from '../redux/action';
import { sortProductAction } from '../redux/action';


class ProductPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 1,
            selectSort: "harga-asc"
         }
    }

    handleSelect = (event) => {
        this.setState({
            selectSort: event.target.value
        })

        console.log("isi select=>",this.state.selectSort)
    }

    printProduct = () => {
        let {page} = this.state
      return  this.props.productList.slice(page > 1 ? (page - 1) * 8  : page - 1, page * 8).map((item,index) => {
            return <div className="col-3 mt-2">
                <Card>
                    <Link to={`/product-detail?id=${item.id}`} style={{ textDecoration:"none", color: "black" }}>
                        <CardImg
                        src={item.images[0]}
                        top width="100%" alt={`${item.nama}-${index}`}
                        />
                        <CardBody>
                            <CardTitle tag="h6" style={{ fontWeight: "bolder" }}>{item.nama}</CardTitle>
                            <CardTitle tag="h6" style={{ fontWeight: "bolder" }}>Rp.{item.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productList.length / 8); i++ ) {
           btn.push(<Button outline color="primary" disabled={this.state.page == i + 1 ? true : false} onClick={() => this.setState({page: i + 1})}>{i+1}</Button>)
        }

        return btn

    }

    btSearch = () => {
        this.props.getProductAction({
            nama: this.inSearchName.value,
            hargaMax: this.inSearchMax.value,
            hargaMin: this.inSearchMin.value
        })
        this.setState({ page: 1 })
    }

    btReset = () => {
        this.props.getProductAction()
        this.inSearchName.value = null
        this.inSearchMin.value = null
        this.inSearchMax.value = null
    }

    btSort = () => {
        
        this.props.sortProductAction(this.state.selectSort)
    }

    render() { 
        return ( 
            <div className="pt-5">
                <div className="container shadow bg-white rounded p-3 mb-5">
                    <div className="row">
                    {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                         <InputGroup style={{ width: "350px" }}>
                            <Input type="text" id="text" placeholder="Cari produk"
                                innerRef={(element) => this.inSearchName = element} />
                            <InputGroupText style={{ cursor: "pointer" }} onClick={this.btSearch}>
                                Search
                            </InputGroupText>
                        </InputGroup>
                        <Input type="select" style={{ width: "250px" }}>
                            <option value="harga-asc">Harga Asc</option>
                            <option value="harga-desc">Harga Desc</option>
                            <option value="nama-asc">A-Z</option>
                            <option value="nama-desc">Z-A</option>
                            <option value="id-asc">Reset</option>
                        </Input>
                        <Button outline color="warning" onClick={() => this.props.getProductAction()}>Reset</Button>
                    </div> */}
                    <div className="col-3">
                        <FormGroup>
                            <Label>Nama</Label>
                            <Input type="text" placeholder="cari produk" innerRef={(element) => this.inSearchName = element}></Input>
                        </FormGroup>
                    </div>
                    <div className="col-6">
                        <FormGroup>
                            <Label>Harga</Label>
                            <InputGroup>
                                <Input type="number" placeholder="minimum" innerRef={(element) => this.inSearchMin = element}></Input>
                                <Input type="number" placeholder="maximum" innerRef={(element) => this.inSearchMax = element}></Input>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className="col-3">
                        <FormGroup>
                            <Label>Sort</Label>
                            <InputGroup>
                                <Input type="select" value={this.state.selectSort} onChange={this.handleSelect}>
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                                <Button outline size="sm" color="info" onClick={this.btSort}>Sort</Button>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    </div>
                    <div className="d-flex justify-content-end mt-1">
                        <Button style={{ marginRight: "1vw" }} outline color="warning" onClick={this.btReset}>Reset</Button>
                        <Button  color="primary" onClick={this.btSearch}>Filter</Button>
                    </div>
                </div>
                <div className="container">
                <div className="row">
                    {this.printProduct()}
                </div>
                </div>
                <div className="my-5 text-center">
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                </div>
            </div>
         );
    }
}

const mapToProps = ({productReducer}) => {
    //console.table(productReducer.productList)
    return {
        productList: productReducer.productList
    }
}
 
export default connect(mapToProps,{getProductAction,sortProductAction}) (ProductPages);