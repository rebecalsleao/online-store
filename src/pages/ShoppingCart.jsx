import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    myCart: [],
  };

  componentDidMount() {
    if (localStorage.cart) {
      const getStorage = JSON.parse(localStorage.getItem('cart'));
      this.setState({ myCart: getStorage });
    }
  }

  render() {
    const { myCart } = this.state;
    return (
      <div>
        { myCart.length > 0 ? (
          <div>
            { myCart.map((item) => (
              <div key={ item.id }>
                <h1 data-testid="shopping-cart-product-name">
                  {item.title}
                </h1>
                <p>{item.price}</p>
                <p data-testid="shopping-cart-product-quantity">
                  Quantidade:
                  {item.quantidade}
                </p>
              </div>
            ))}
          </div>
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> }
      </div>
    );
  }
}

export default ShoppingCart;
