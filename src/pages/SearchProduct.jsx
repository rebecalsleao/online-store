import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class SearchProduct extends Component {
  state = {
    search: '',
    searchList: []
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clickApi = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    this.setState({ searchList: response.results });
  };

  render() {
    const { search, searchList } = this.state;

    return (
      <div>
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
          onClick={ this.clickApi }

        >
          Buscar
        </button>
        { searchList.length > 0 ? (
          <div>
            { searchList.map((list) => (
              <div key={ list.id } data-testid="product">
                <p>{ list.title }</p>
                <img src={ list.thumbnail } alt={ list.title } />
                <p>{`R$ ${list.price},00`}</p>
              </div>
            ))}
          </div>) : (<p>Nenhum produto foi encontrado</p>) }
      </div>
    );
  }
}

export default SearchProduct;
