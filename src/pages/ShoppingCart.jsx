import React, { Component } from 'react';
import CardShoppingCart from '../components/CardShoppingCart';
import Header from './Header';

class ShoppingCart extends Component {
  state = {
    myCart: [],
  };

  componentDidMount() {
    if (localStorage.cart) {
      const getStorage = JSON.parse(localStorage.getItem('cart'));
      this.setState({ myCart: getStorage });
    } else {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  addLocalStorage = (newArray) => {
    this.setState({ myCart: newArray }, () => {
      const { myCart } = this.state;
      localStorage.setItem('cart', JSON.stringify(myCart));
    });
  };

  render() {
    const { myCart } = this.state;
    return (
      <div>
        <Header />
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
