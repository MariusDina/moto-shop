import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../wrappers/CartContext/CartContext';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ShoppingCart: React.FC = () => {
  const { cart, clearCart, removeItem } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const removeItemFromCart = (index: number) => {
    removeItem(index);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Container className='mt-4'>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Row>
            <Col xs={12}>
              {cart.map((item, index) => (
                <div key={index} className='mb-3 p-3 border rounded'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <strong>
                        {item.brand} {item.model}
                      </strong>{' '}
                      - {capitalizeFirstLetter(item.color)} / {item.tire}
                      {item.quickShifter && (
                        <span className='ml-2'> / Quick Shifter</span>
                      )}
                    </div>
                    <div>
                      <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={() => removeItemFromCart(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className='mt-2'>Price: ${item.price.toFixed(2)}</div>
                </div>
              ))}
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12}>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <strong>Total:</strong>
                </div>
                <div>${totalPrice.toFixed(2)}</div>
              </div>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col xs={12}>
              <Button
                variant='danger'
                onClick={clearCart}
                style={{ marginRight: '8px' }}
              >
                Clear Cart
              </Button>
              <Button variant='primary' onClick={handleCheckout}>
                Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
