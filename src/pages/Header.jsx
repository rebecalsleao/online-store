import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { buttonSeach, valueSearch, changeInput } = this.props;
    return (
      <div className="container-header">
        <div className="container-search">
          <input
            data-testid="query-input"
            type="text"
            name="search"
            value={ valueSearch }
            onChange={ changeInput }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ buttonSeach }
          >
            Buscar
          </button>
        </div>
        <div className="container-title">
          <Link to="/" className="link-title">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2649/2649327.png"
              alt="slogan-title"
              className="slogan-title"
            />
            <div className="title">
              <h1>Front-End</h1>
              <h2>Online Store</h2>
            </div>
          </Link>
        </div>
        <nav>
          <Link to="/shopping" data-testid="shopping-cart-button">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1374/1374128.png"
              alt="Shopping Cart"
              className="img-cart"
            />
          </Link>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  buttonSeach: PropTypes.func.isRequired,
  valueSearch: PropTypes.string.isRequired,
  changeInput: PropTypes.func.isRequired,
};
