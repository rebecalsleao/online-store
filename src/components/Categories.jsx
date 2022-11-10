import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Categories extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div data-testid="product">
        <Link to={ `/product/${list.id}` } data-testid="product-detail-link">
          <p>{list.title}</p>
          <img src={ list.thumbnail } alt={ list.title } />
          <p>{`R$ ${list.price}`}</p>
        </Link>
      </div>
    );
  }
}

Categories.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string,
  }).isRequired,
};

export default Categories;
