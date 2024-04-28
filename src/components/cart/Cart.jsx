import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Coupon from '../coupon/Coupon';
import { discountType, discountCouponInfo } from '../../constants/constant';
import { addQuantity, subtractQuantity, removeFromCart, emptyCart } from '../../redux/actions/cartActions';
import { applyCoupon, appliedCount } from '../../redux/actions/couponActions';
import './cart.scss';

const Cart = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const subTotal = useSelector((state) => state.cartReducer.cartTotal);
  const appliedCoupon = useSelector((state) => state.couponReducer.appliedCoupon);
  const appliedCouponCount = useSelector((state) => state.couponReducer.appliedCouponCount);
  const [cartTotal, setCartTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const isSmallScreen = window.innerWidth < 992;

  useEffect(() => {
    calculateDiscount();
    subTotal === 0 && removeCoupon();
    if((appliedCoupon?.couponCode === discountCouponInfo.code) && (((appliedCouponCount === 0) && appliedCoupon) || ((appliedCouponCount + 1) % discountCouponInfo.orderNumber !== 0))) {
      setIsInvalidCode(true);
    }
    else {
      setIsInvalidCode(false);
    }
  }, [subTotal, appliedCoupon]);

  const calculateDiscount = () => {
    if(appliedCoupon) {
      let total;
      if(appliedCoupon?.discountType === discountType.amount) {
        total = subTotal - appliedCoupon.discountValue;
      }
      else if(appliedCoupon?.discountType === discountType.percent) {
        total = subTotal - (subTotal * (appliedCoupon.discountValue/100));
      }
      setCartTotal(Math.round(total));
    }
    else {
      setCartTotal(subTotal);
    }
  }

  const addCartQuantity = (item) => {
    dispatch(addQuantity(item));
  }

  const subtractCartQuantity = (item) => {
    dispatch(subtractQuantity(item));
  }

  const removeCartItem = (item) => {
    dispatch(removeFromCart(item));
  }

  const showCouponModal = () => {
    setShowModal(true);
  }

  const removeCoupon = () => {
    dispatch(applyCoupon(null));
  }

  const checkout = () => {
    dispatch(emptyCart([]));
    dispatch(applyCoupon(null));
    dispatch(appliedCount());
    navigate("/order");
  }
  
  return (
    <section className="section">
      <div className="section-title">Shopping Bag</div>
      <Container fluid className="padding-main">
        {cartItems.length ?
          <Row>
            <Col sm={12} md={12} lg={7} className="margin-bottom-2">
              <Row className="cart-header cart-product">
                <Col sm={5}>PRODUCT</Col>
                <Col sm={2}>PRICE</Col>
                <Col sm={3}>QUANTITY</Col>
                <Col sm={2}>SUBTOTAL</Col>
              </Row>
              {cartItems.map((item) => {
                return (
                  <Row className="cart-row" key={item.id}>
                    <Col sm={5} className="product-col">
                      <img src={item.image} alt="cart" />
                      <div>
                        <div className="title">{item.title}</div>
                        <div className="sub-title">{item.description}</div>
                      </div>
                    </Col>
                    <Col sm={2} className="color-muted"><i className="fa fa-inr" aria-hidden="true"></i>{item.price}</Col>
                    <Col sm={3}>
                      <div className="quantity-input">
                        <span onClick={()=>{subtractCartQuantity(item)}}>-</span>
                        <input type="text" value={item.quantity} disabled />
                        <span onClick={()=>{addCartQuantity(item)}}>+</span>
                      </div>
                    </Col>
                    <Col sm={2} className="d-flex align-center content-between">
                      <span><i className="fa fa-inr" aria-hidden="true"></i>{item.quantity * item.price}</span>
                      <span className="delete-icon" onClick={()=>{removeCartItem(item)}}>x</span>
                    </Col>
                  </Row>
                )
              })}
            </Col>
            {!isSmallScreen && <Col sm={1}></Col>}
            <Col sm={12} md={isSmallScreen ? 12 : 11} lg={4} className="margin-bottom-2">
              <div className="cart-total-container">
                <div className="coupon-container">
                  <input type="text" placeholder="Coupon Code" value={appliedCoupon?.couponCode || ""} disabled></input>
                  {appliedCoupon?.couponCode ?
                  <Button variant="info" size="sm" onClick={() => removeCoupon()}>
                    REMOVE
                  </Button> :
                  <Button variant="info" size="sm" onClick={() => showCouponModal()}>
                    SELECT
                  </Button>
                  }
                </div>
                {isInvalidCode && <span className="error"><i className="fa fa-exclamation-circle" aria-hidden="true"></i>This code is invalid for this order</span>}
                <div className="title">CART TOTALS</div>
                <Row className="cart-header padding-top-1">
                  <Col sm={4}>SUBTOTAL</Col>
                  <Col sm={8}>
                    <span><i className="fa fa-inr" aria-hidden="true"></i>{subTotal}</span>
                  </Col>
                </Row>
                <Row className="cart-header padding-top-1 d-flex align-center">
                  <Col sm={4}>DISCOUNT</Col>
                  <Col sm={8}>
                    <span>
                      {((appliedCoupon?.discountType === discountType.amount) || !appliedCoupon) && <i className="fa fa-inr" aria-hidden="true"></i>}
                      {appliedCoupon?.discountValue || 0}
                      {appliedCoupon?.discountType === discountType.percent && "%"}
                    </span>
                  </Col>
                </Row>
                <Row className="cart-header padding-top-1">
                  <Col sm={4}>TOTAL</Col>
                  <Col sm={8}>
                    <span><i className="fa fa-inr" aria-hidden="true"></i>{cartTotal}</span>
                  </Col>
                </Row>
              </div>
              <Button variant="secondary" size="lg" className="checkout-button" onClick={() => checkout()} disabled={isInvalidCode}>
                PROCEED TO CHECKOUT
              </Button>
            </Col>
          </Row>
        :
          <div className="center">
            <h4>Your bag is empty!</h4>
            <Link to="/" className="return-link"><span>RETURN TO SHOP</span></Link>
          </div>
        }
      </Container>
      <Coupon showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}

export default Cart;