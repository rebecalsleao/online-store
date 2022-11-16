import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormAvaliation extends Component {
  render() {
    const { email, message, handleChange, avaliation, handleClick,
      formValidate } = this.props;
    return (
      <div className="container-avaliation">
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="E-mail"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          <div className="container-valor" onChange={ handleChange }>
            <input
              type="radio"
              data-testid="1-rating"
              name="avaliation"
              value="1"
              className="star-icon"
              checked={ avaliation === '1' }
            />
            <input
              type="radio"
              data-testid="2-rating"
              name="avaliation"
              value="2"
              className="star-icon"
              checked={ avaliation === '2' }
            />
            <input
              type="radio"
              data-testid="3-rating"
              name="avaliation"
              value="3"
              className="star-icon"
              checked={ avaliation === '3' }
            />
            <input
              type="radio"
              data-testid="4-rating"
              name="avaliation"
              value="4"
              className="star-icon"
              checked={ avaliation === '4' }
            />
            <input
              type="radio"
              data-testid="5-rating"
              name="avaliation"
              value="5"
              className="star-icon"
              checked={ avaliation === '5' }
            />
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(opicional)"
            name="message"
            value={ message }
            onChange={ handleChange }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ (e) => handleClick(e) }
          >
            Avaliar

          </button>

          {
            formValidate && (<p data-testid="error-msg">Campos inválidos</p>)
          }
        </form>
      </div>
    );
  }
}

FormAvaliation.propTypes = {
  email: PropTypes.string.isRequired,
  avaliation: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  formValidate: PropTypes.bool.isRequired,
};
