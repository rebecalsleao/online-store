import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';

class Home extends Component {
  state = {
    categories: [],
    productList: [],
    search: '',
  };

  async componentDidMount() {
    const api = await this.listCategories();
    console.log(api);
  }

  listCategories = async () => {
    const api = await getCategories();
    this.setState({ categories: api });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleCategories = async ({ target }) => {
    const { checked, value } = target;
    const { search } = this.state;
    if (checked) {
      const response = await getProductsFromCategoryAndQuery(value, '');
      this.setState({ productList: response.results });
    } else {
      const response = await getProductsFromCategoryAndQuery('', search);
      this.setState({ productList: response.results });
    }
  };

  render() {
    const { categories, productList, search } = this.state;
    console.log(productList);
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
        <div className="container-search">
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <input
            data-testid="query-input"
            type="text"
            name="search"
            value={ search }
            onChange={ this.handleChange }

          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleCategories }

          >
            Buscar
          </button>
          <br />
          <Link to="/shopping" data-testid="shopping-cart-button">Shopping Cart</Link>
        </div>
        { productList.length > 0 ? (
          <div>
            { productList.map((product) => (
              <Categories
                key={ product.id }
                list={ product }
              />))}
          </div>) : (<p>Nenhum produto foi encontrado</p>) }
      </div>
    );
  }
}

export default Home;
