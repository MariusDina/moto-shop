import React, { useState } from 'react';
import { useCart } from '../../wrappers/CartContext/CartContext';
import { Row, Col } from 'react-bootstrap';
import { Container, Form, Button } from 'react-bootstrap';
import { refreshAccount, sendTransactions } from 'helpers';
import { AuthRedirectWrapper } from 'wrappers';

interface CartItem {
  brand: string;
  model: string;
  color: string;
  tire: string;
  quickShifter: boolean;
  price: number;
}

const CheckoutForm: React.FC = () => {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your checkout logic here, e.g., send data to a server
    console.log('Form data submitted:', formData);
  };

  const getFormData = () => {
    return `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email} \nAddress: ${formData.address}`;
  };

  const sendEGLDTransaction = async () => {
    const convertTo18Decimals = (amount: number) => {
      let stringWith18Decimals = Number(amount).toFixed(2);
      stringWith18Decimals += '0000000000000000';

      console.log(stringWith18Decimals.replace('.', ''));
      return stringWith18Decimals.replace('.', '');
    };

    console.log(totalEGLD);
    const pingTransaction = {
      value: convertTo18Decimals(totalEGLD),
      data: getFormData(),
      receiver:
        'erd1dg9phkqh4af7re2ns7kceyqhwjf25kjs7ar5ehvhgp5y0nrkzmcsazlhuv',
      gasLimit: '60000000'
    };

    await refreshAccount();
    await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
  };

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce(
    (total, item: CartItem) => total + item.price,
    0
  );
  const totalEGLD = totalPrice / 107;

  return (
    <Container className='mt-4'>
      <h2>Checkout Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='firstName' className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your first name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='lastName' className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your last name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId='address' className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Enter your address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className='mt-3'>
          <Col xs={12}>
            <div className='d-flex align-items-center'>
              <div style={{ marginRight: '8px' }}>
                <strong>Total:</strong>
              </div>
              <div>${totalPrice.toFixed(2)}</div>
            </div>
            <div className='d-flex align-items-center'>
              <div style={{ marginRight: '8px' }}>
                <strong>To pay:</strong>
              </div>
              <div>{totalEGLD.toFixed(2)} eGLD</div>
            </div>
          </Col>
        </Row>

        <Button
          variant='primary'
          type='submit'
          onClick={() => {
            // curl -X 'GET' 'https://devnet-api.multiversx.com/economics' -H 'accept: application/json'
            // calculate the EGLD needed
            sendEGLDTransaction();
          }}
        >
          Submit and Pay
        </Button>
      </Form>
    </Container>
  );
};

const AuthForm = () => {
  return (
    <AuthRedirectWrapper>
      <CheckoutForm />
    </AuthRedirectWrapper>
  );
};

export default AuthForm;
