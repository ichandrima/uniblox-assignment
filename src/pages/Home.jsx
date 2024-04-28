import React from 'react';
import Deals from '../components/deal/Deal';
import Products from '../components/product/Product';

const Home = () => {

  return (
    <section className="section">
      <Deals />
      <Products />
    </section>
  );
}

export default Home;