import React, { Component } from 'react';

class CardShoppingCart extends Component {
  state = {
    productItem: {},
    arrayProduct: [],
  };

  componentDidMount() {
    const { arraProduct, product } = this.props;
    this.setState({
      productItem: product,
      arrayProduct: arraProduct,
    });
  }

  setQuatiProductMore = () => {
    const { productItem, arrayProduct } = this.state;
    const { funcLocalStorage } = this.props;
    const newStorage = arrayProduct.indexOf(productItem);
    const newObject = arrayProduct;
    newObject[newStorage].quantidade += 1;
    funcLocalStorage(newObject);
  };

  setQuatiProductAny = () => {
    const { productItem, arrayProduct } = this.state;
    const { funcLocalStorage } = this.props;
    const validation = productItem.quantidade >= 2;
    if (validation) {
      const newStorage = arrayProduct.indexOf(productItem);
      const newObject = arrayProduct;
      newObject[newStorage].quantidade -= 1;
      funcLocalStorage(newObject);
    }
  };

  setRemoveItem = () => {
    const { productItem, arrayProduct } = this.state;
    const { funcLocalStorage } = this.props;
    const removeItem = arrayProduct.filter((item) => item !== productItem);
    funcLocalStorage(removeItem);
    this.componentDidUpdate();
  };

  render() {
    const { product } = this.props;
    const { title, price, quantidade } = product;
    return (
      <div>
        <h1 data-testid="shopping-cart-product-name">
          {title}
        </h1>
        <p>{ quantidade * price}</p>
        <button
          type="button"
          onClick={ this.setQuatiProductMore }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <p data-testid="shopping-cart-product-quantity">
          Quantidade:
          {quantidade}
        </p>
        <button
          type="button"
          onClick={ this.setQuatiProductAny }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ this.setRemoveItem }
        >
          Remover Produto
        </button>
      </div>
    );
  }
}

export default CardShoppingCart;
