import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';
import Header from './Header';

class Home extends Component {
  state = {
    categories: [],
    productList: [],
    search: '',
    storage: [],
  };

  async componentDidMount() {
    await this.listCategories();
  }

  addLocalStorage = (newArray) => {
    this.setState({ storage: newArray }, () => {
      const { storage } = this.state;
      localStorage.setItem('cart', JSON.stringify(storage));
    });
  };

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
    const { categories, productList, search, storage } = this.state;
    return (
      <div className="primary-container">
        <Header
          buttonSeach={ this.handleCategories }
          valueSearch={ search }
          changeInput={ this.handleChange }
        />
        <div className="container-main">
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
          <div className="main">
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            { productList.length > 0 ? (
              <div className="container-products">
                { productList.map((product) => (
                  <Categories
                    addLocalStorage={ this.addLocalStorage }
                    storage={ storage }
                    key={ product.id }
                    list={ product }
                  />))}
              </div>) : (<p>Nenhum produto foi encontrado</p>) }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
