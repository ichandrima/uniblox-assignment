import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const cartItemCount = useSelector((state) => state.cartReducer.cartItems.length);

  return (
    <header className="header padding-main">
      <div className="full-height d-flex align-center content-between">
        <Link to="/"><img className="logo" src="/assets/logo.png" alt="logo"/></Link>
        <div className="p-relative">
          <span className="user">Hello, User</span>
          <Link to="/cart"><i className="fa fa-shopping-cart icon" aria-hidden="true"></i></Link>
          {cartItemCount > 0 && <div className="cart-count">{cartItemCount}</div>}
        </div>
      </div>
    </header>
  );
}

export default Header;