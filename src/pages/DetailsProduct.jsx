import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Header from './Header';
import FormAvaliation from '../components/FormAvaliation';

class DetailsProduct extends Component {
  state = {
    detailsProduct: {},
    storage: [],

  };

  async componentDidMount() {
    this.requireApiProduct();
    localStorage.setItem('cart', JSON.stringify([]));
  }

  requireApiProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const objProduct = await getProductById(id);
    objProduct.quantidade = 1;
    this.setState({
      detailsProduct: objProduct,
    });
  };

  addLocalStorage = (newArray) => {
    this.setState({ storage: newArray }, () => {
      const { storage } = this.state;
      localStorage.setItem('cart', JSON.stringify(storage));
    });
  };

  setProductCart = () => {
    const { detailsProduct, storage } = this.state;
    const validation = storage.some((e) => e.id === detailsProduct.id);
    if (validation) {
      const newStorage = storage.indexOf(detailsProduct);
      const newObject = storage;
      newObject[newStorage].quantidade += 1;
      this.addLocalStorage(newObject);
    } else {
      storage.push(detailsProduct);
      this.addLocalStorage(storage);
    }
  };

  render() {
    const { detailsProduct } = this.state;
    const { price } = detailsProduct;
    return (
      <div>
        <Header />
        <h3 data-testid="product-detail-name">{ detailsProduct.title }</h3>
        <img
          src={ detailsProduct.thumbnail }
          alt={ detailsProduct.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          {price}
        </p>
        <Link to="/shopping">Ir Para o Carrinho</Link>
        <br />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.setProductCart }
        >
          Adicionar ao carrinho
        </button>
        <FormAvaliation />
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
