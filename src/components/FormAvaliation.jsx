import React, { Component } from 'react';

export default class FormAvaliation extends Component {
  render() {
    return (
      <div className="container-avaliation">
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="E-mail"
            name="email"
          />
          <div className="container-valor">
            <input
              type="radio"
              data-testid="1-rating"
              name="avaliantion"
              value={ 1 }
              className="star-icon"
            />
            <input
              type="radio"
              data-testid="2-rating"
              name="avaliantion"
              value={ 2 }
              className="star-icon"
            />
            <input
              type="radio"
              data-testid="3-rating"
              name="avaliantion"
              value={ 3 }
              className="star-icon"
            />
            <input
              type="radio"
              data-testid="4-rating"
              name="avaliantion"
              value={ 4 }
              className="star-icon"
            />
            <input
              type="radio"
              data-testid="5-rating"
              name="avaliantion"
              value={ 5 }
              className="star-icon"
            />
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(opicional)"
          />
          <button type="submit" data-testid="submit-review-btn">Avaliar</button>
        </form>
      </div>
    );
  }
}
