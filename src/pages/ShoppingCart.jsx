import React, { Component } from 'react';
import CardShoppingCart from '../components/CardShoppingCart';

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

  addLocalStorage = (newArray) => {
    this.setState({ storage: newArray }, () => {
      const { storage } = this.state;
      localStorage.setItem('cart', JSON.stringify(storage));
    });
  };

  render() {
    const { myCart } = this.state;
    return (
      <div>
        { myCart.length > 0 ? (
          <div>
            { myCart.map((item) => (
              <CardShoppingCart
                product={ item }
                key={ item.id }
                arraProduct={ myCart }
                funcLocalStorage={ this.addLocalStorage }
              />
            ))}
          </div>
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> }
      </div>
    );
  }
}

export default ShoppingCart;
