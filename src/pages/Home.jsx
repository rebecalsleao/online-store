import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import SearchProduct from './SearchProduct';
import Categories from '../components/Categories';

class Home extends Component {
  state = {
    categories: [],
    productList: [],
  };

  async componentDidMount() {
    const api = await this.listCategories();
    console.log(api);
  }

  listCategories = async () => {
    const api = await getCategories();
    this.setState({ categories: api });
  };

  handleCategories = async ({ target }) => {
    const { value } = target;
    const response = await getProductsFromCategoryAndQuery(value, '');
    this.setState({ productList: response.results });
  };

  render() {
    const { categories, productList } = this.state;
    return (
      <div className="container">
        <div className="container-categories">
          { categories.map((categorie) => (
            <label htmlFor={ categorie.id } data-testid="category" key={ categorie.id }>
              <input
                id={ categorie.id }
                type="radio"
                name="categories"
                value={ categorie.id }
                onChange={ this.handleCategories }
              />
              { categorie.name }
            </label>
          ))}
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping" data-testid="shopping-cart-button">Shopping Cart</Link>
        <SearchProduct />
        { productList.length > 0 && (
          <div>
            { productList.map((product) => (
              <Categories
                key={ product.id }
                list={ product }
              />))}
          </div>) }
      </div>
    );
  }
}

export default Home;
