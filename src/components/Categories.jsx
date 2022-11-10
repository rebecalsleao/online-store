import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div data-testid="product">
        <p>{list.title}</p>
        <img src={ list.thumbnail } alt={ list.title } />
        <p>{`R$ ${list.price},00`}</p>
      </div>
    );
  }
}

Categories.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Categories;
