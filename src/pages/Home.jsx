import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const api = await this.listCategories();
    console.log(api);
  }

  listCategories = async () => {
    const api = await getCategories();
    this.setState({ categories: api });
  };

  render() {
    const { categories } = this.state;
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
              />
              { categorie.name }
            </label>
          ))}
        </div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/shopping" data-testid="shopping-cart-button">Shopping Cart</Link>
      </div>
    );
  }
}

export default Home;
