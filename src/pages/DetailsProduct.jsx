import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class DetailsProduct extends Component {
  state = {
    detailsProduct: {},
  };

  async componentDidMount() {
    this.requireApiProduct();
  }

  requireApiProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const objProduct = await getProductById(id);
    console.log(objProduct);
    this.setState({
      detailsProduct: objProduct,
    });
  };

  render() {
    const { detailsProduct } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ detailsProduct.title }</h3>
        <img
          src={ detailsProduct.thumbnail }
          alt={ detailsProduct.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">{`R$ ${detailsProduct.price}`}</p>
        <Link to="/shopping" data-testid="shopping-cart-button">Ir Para o Carrinho</Link>
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsProduct;
