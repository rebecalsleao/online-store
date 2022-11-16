import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Header from './Header';
import FormAvaliation from '../components/FormAvaliation';
import ViewComments from '../components/ViewComments';

class DetailsProduct extends Component {
  state = {
    detailsProduct: {},
    storage: [],
    email: '',
    avaliation: null,
    message: '',
    formValidate: false,
    comments: [],
  };

  async componentDidMount() {
    await this.requireApiProduct();
    localStorage.setItem('cart', JSON.stringify([]));
    const { match: { params: { id } } } = this.props;
    if (localStorage[id]) {
      this.setState({
        comments: JSON.parse(localStorage.getItem(id)),
      });
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    const { email, avaliation, message } = this.state;
    const validation = [
      email.length > 0, avaliation !== null,
    ];
    console.log(validation);
    const verification = validation.some((el) => el === false);
    if (verification) {
      this.setState({ formValidate: true });
    } else {
      const { comments } = this.state;
      const { match: { params: { id } } } = this.props;
      const objectAvaliation = { email, avaliation, message };
      comments.push(objectAvaliation);
      localStorage.setItem(`${id}`, JSON.stringify(comments));
      this.setState({ formValidate: false, email: '', message: '', avaliation: '0' });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  requireApiProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const objProduct = await getProductById(id);
    objProduct.quantidade = 1;
    this.setState({
      detailsProduct: objProduct,
    }, () => {
      const { detailsProduct } = this.state;
      if (!localStorage[id]) {
        localStorage.setItem(`${detailsProduct.id}`, JSON.stringify([]));
      }
    });
  };

  addLocalStorage = (newArray) => {
    this.setState({ storage: newArray }, () => {
      const { storage } = this.state;
      localStorage.setItem('cart', JSON.stringify(storage));
    });
  };

  setProductCart = () => {
    const { detailsProduct, storage } = this.state;
    const validation = storage.some((e) => e.id === detailsProduct.id);
    if (validation) {
      const newStorage = storage.indexOf(detailsProduct);
      const newObject = storage;
      newObject[newStorage].quantidade += 1;
      this.addLocalStorage(newObject);
    } else {
      storage.push(detailsProduct);
      this.addLocalStorage(storage);
    }
  };

  render() {
    const { detailsProduct, email, avaliation, message, formValidate,
      comments } = this.state;
    const { price } = detailsProduct;
    return (
      <div>
        <Header />
        <h3 data-testid="product-detail-name">{ detailsProduct.title }</h3>
        <img
          src={ detailsProduct.thumbnail }
          alt={ detailsProduct.title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">
          {price}
        </p>
        <Link to="/shopping">Ir Para o Carrinho</Link>
        <br />
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.setProductCart }
        >
          Adicionar ao carrinho
        </button>
        <FormAvaliation
          email={ email }
          avaliation={ avaliation }
          message={ message }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          formValidate={ formValidate }
        />
        { comments.length && (
          <div>
            {comments.map((comment) => (
              <ViewComments
                comment={ comment }
                key={ comment.email }
              />)) }
          </div>)}
      </div>
    );
  }
}

DetailsProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailsProduct;
