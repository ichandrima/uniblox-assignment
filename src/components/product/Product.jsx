import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { getProducts } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';
import './product.scss';

const Products = () => {
  let dispatch = useDispatch();
  const productData = useSelector((state) => state.productReducer.products);
  const selectCartItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    !productData?.length && dispatch(getProducts());
  }, []);

  const addCartItem = async (item) => {
    dispatch(addToCart(item));
  }
  
  return (
    <>
      <div className="section-title">Featured Products</div>
      <Container fluid className="padding-main">
        <Row>
          {productData?.map((item) => {
            let inCart = selectCartItems.find((cartItem) => cartItem.id === item.id);
            return (
              <Col sm={6} md={4} lg={3} gap={2} className="margin-bottom-2" key={item.id}>
                <Card className="product-card">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title className="card-content">{item.title}</Card.Title>
                    <Card.Text className="card-price">
                      <span className="d-flex align-center content-between">
                        <span><i className="fa fa-inr" aria-hidden="true"></i>{item.price}</span>
                        {inCart ?
                          <i className="fa fa-cart-plus cart-icon" aria-hidden="true"></i> :
                          <span className="add-cart pointer" onClick={() => addCartItem(item)}><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;ADD TO CART</span>
                        }
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </>
  );
}

export default Products;