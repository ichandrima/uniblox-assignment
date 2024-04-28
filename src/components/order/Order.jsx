import React from 'react';
import './order.scss';

const Order = () => {

  return (
    <section className="section">
      <div className="center">
        <i className="fa fa-check order-icon" aria-hidden="true"></i>
        <h1>Your order is completed!</h1>
        <span>Thank you.</span>
      </div>

    </section>
  );
}

export default Order;