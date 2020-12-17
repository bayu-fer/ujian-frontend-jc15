import React, { Component } from "react";
import { connect } from "react-redux";
import { ProductCard } from "../component";
import { fetchProducts } from "../redux/actions";
import { Jumbotron, Button } from "reactstrap";
// import { ProductModal } from "../component";
class LandingPage extends Component {
  state = {};

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  renderCard = () => {
    const { product } = this.props;
    return product.map((val, i) => {
      return (
        <div className="m-5" style={{}}>
          <ProductCard
            image={val.image}
            name={val.name}
            price={val.price}
            id={val.id}
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <div>
          <div>
            <Jumbotron>
              <h1 className="display-3">KAMERAKAWAN</h1>
              <p className="lead">
              Selamat datan di Toko Kami, disini kami menyediakan berbagai macam macam kamera
              </p>
              <hr className="my-2" />
              <p>
                Langsung Checkout yaa, Jepret Momentmu diakhir tahun ini
              </p>
              <p className="lead">
                <Button color="primary">Learn More</Button>
              </p>
            </Jumbotron>
          </div>
        </div>
        <div className='d-flex'>
        {this.renderCard()}
        </div>
      </div>
    );
  }
}
const mapStatetoProps = ({ product }) => {
  return {
    product: product.productList,
  };
};

export default connect(mapStatetoProps, { fetchProducts })(LandingPage);
