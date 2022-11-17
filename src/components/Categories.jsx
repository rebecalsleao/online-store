import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Categories extends React.Component {
  state = {
    productItems: { },
  };

  componentDidMount() {
    const { list } = this.props;
    list.quantidade = 1;
    this.setState({ productItems: list });
  }

  setProductCart = () => {
    const { storage, addLocalStorage } = this.props;
    const { productItems } = this.state;
    const validation = storage.some((e) => e.id === productItems.id);
    if (validation) {
      const newStorage = storage.indexOf(productItems);
      const newObject = storage;
      newObject[newStorage].quantidade += 1;
      addLocalStorage(newObject);
    } else {
      storage.push(productItems);
      addLocalStorage(storage);
    }
  };

  render() {
    const { list } = this.props;
    const { shipping } = list;
    return (
      <div data-testid="product" className="card">
        <Link to={ `/product/${list.id}` } data-testid="product-detail-link">
          <p>{list.title}</p>
          <img src={ list.thumbnail } alt={ list.title } />
          <p>
            {(list.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </Link>
        { shipping.free_shipping && <p data-testid="free-shipping">FRETE GRÁTIS</p> }
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
    quantidade: PropTypes.number,
    shipping: PropTypes.shape({ free_shipping: PropTypes.bool }),
  }).isRequired,

  storage: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addLocalStorage: PropTypes.func.isRequired,
};

export default Categories;
