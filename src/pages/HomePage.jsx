import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import { API_URL } from '../helper';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: []
         }
    }


    render() { 
        return ( 
            <div>
                <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-interval="10000">
                        <img width="100%" height="500px" src="https://previews.123rf.com/images/serkorkin/serkorkin1512/serkorkin151200072/49549180-best-sale-vector-banner-discount-up-to-50-vector-banner-big-offer-vector-banner-abstract-horizontal-.jpg" className="d-block " alt="..."/>
                        </div>
                        <div className="carousel-item" data-interval="2000">
                        <img width="100%" height="500px" src="https://static.vecteezy.com/system/resources/thumbnails/002/453/533/small_2x/big-sale-discount-banner-template-promotion-illustration-free-vector.jpg" className="d-block " alt="..."/>
                        </div>
                        <div className="carousel-item" data-interval="2000">
                        <img width="100%" height="500px" src="https://media.istockphoto.com/vectors/sale-banner-template-design-vector-id945107144" className="d-block " alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-target="#carouselExampleInterval" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-target="#carouselExampleInterval" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
                {
                    this.props.productList.length > 0 && 
                    <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 order-xl-0 order-md-0  order-sm-1 order-1 text-center">
                            <img width="90%" height="90%" className="shadow bg-white mb-5 rounded" src={this.props.productList[11].images[0]} alt="" />
                        </div>
                        <div className="col-md-6 order-xl-1 order-md-1 order-sm-0 order-0" style={{ margin: "auto" }} >
                            <h3>{this.props.productList[11].nama}</h3>
                            <h4>{this.props.productList[11].brand} | {this.props.productList[11].kategori}</h4>
                            <p style={{ textAlign: "justify" }}>{this.props.productList[11].deskripsi}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 order-xl-0 order-md-0 order-sm-0 order-0" style={{ margin: "auto" }}>
                            <h3>{this.props.productList[0].nama}</h3>
                            <h4>{this.props.productList[0].brand} | {this.props.productList[0].kategori}</h4>
                            <p style={{ textAlign: "justify" }}>{this.props.productList[0].deskripsi}</p>
                        </div>
                        <div className="col-md-6 text-center order-xl-1 order-md-1 order-sm-1 order-1" >
                            <img width="90%" height="90%" className="shadow bg-white mb-5 rounded" src={this.props.productList[0].images[0]} alt="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-center order-xl-0 order-md-0 order-sm-1 order-1" style={{ margin: "auto" }}>
                            <img width="90%" height="90%" className="shadow bg-white mb-5 rounded" src={this.props.productList[4].images[0]} alt="" />
                        </div>
                        <div className="col-md-6 order-xl-1 order-md-1 order-sm-0 order-0" >
                            <h3>{this.props.productList[4].nama}</h3>
                            <h4>{this.props.productList[4].brand} | {this.props.productList[4].kategori}</h4>
                            <p style={{ textAlign: "justify" }}>{this.props.productList[4].deskripsi}</p>
                        </div>
                    </div>
                </div>
                }
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
 
export default connect(mapToProps) (HomePage);