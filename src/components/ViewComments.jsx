import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ViewComments extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">{comment.email}</p>
        <p data-testid="review-card-rating">{comment.avaliation}</p>
        <p data-testid="review-card-evaluation">{comment.message}</p>
      </div>
    );
  }
}
ViewComments.propTypes = {
  comment: PropTypes.shape({
    email: PropTypes.string,
    avaliation: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};
