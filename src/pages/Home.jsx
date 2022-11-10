import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div> <ul>
      </ul>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping" data-testid="shopping-cart-button">Shopping Cart</Link>
      </div>
    );
  }
}

export default Home;
