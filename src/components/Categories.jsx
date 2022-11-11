import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Categories extends React.Component {
  state = {
    productItems: { },
  };

  componentDidMount() {
    const { list } = this.props;
    this.setState({ productItems: list });
  }

  setProductCart = () => {
    const { storage, addLocalStorage } = this.props;
    const { productItems } = this.state;
    storage.push(productItems);
    addLocalStorage(storage);
  };

  render() {
    const { list } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/product/${list.id}` } data-testid="product-detail-link">
          <p>{list.title}</p>
          <img src={ list.thumbnail } alt={ list.title } />
          <p>{`R$ ${list.price}`}</p>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.setProductCart }
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

Categories.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string,
  }).isRequired,

  storage: PropTypes.arrayOf.isRequired,
  addLocalStorage: PropTypes.func.isRequired,
};

export default Categories;
