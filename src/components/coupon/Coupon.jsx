import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCoupons, applyCoupon } from '../../redux/actions/couponActions';
import './coupon.scss';

const Coupon = ({showModal, setShowModal}) => {
  let dispatch = useDispatch();
  const couponData = useSelector((state) => state.couponReducer.coupons);

  useEffect(() => {
    !couponData?.length && dispatch(getCoupons());
  }, []);

  const hideCouponModal = () => {
    setShowModal(false);
  }

  const selectCoupon = (item) => {
    dispatch(applyCoupon(item));
    hideCouponModal();
  }
  
  return (
    <Modal className="coupon-modal" show={showModal} centered onHide={() => hideCouponModal()}>
      <Modal.Header closeButton>
        <Modal.Title className="title">AVAILABLE COUPONS</Modal.Title>
      </Modal.Header>
      {couponData?.map((item) => {
        return (
          <Modal.Body key={item.id}>
            <div className="coupon-card">
              <div className="code">{item.couponCode}</div>
              <div>{item.title}</div>
              <div className="color-muted">{item.description}</div>
              <Button variant="primary" className="button" onClick={() => selectCoupon(item)}>APPLY COUPON</Button>
            </div>
          </Modal.Body>
        )
      })}
    </Modal>
  );
}

export default Coupon;