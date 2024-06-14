import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  Card
} from 'react-bootstrap';
import { useCart } from '../../wrappers/CartContext/CartContext';

interface Product {
  id: string;
  brand: string;
  model: string;
  description: string;
  colors: { [key: string]: string };
  tires: string[];
  quickShifter: boolean;
  price: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedTire, setSelectedTire] = useState<string>('');
  const [addQuickShifter, setAddQuickShifter] = useState<boolean>(false);

  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch the specific product when the component mounts
    if (!id) {
      console.log('ID is undefined');
      return;
    }
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${productId}`
      );
      const data: Product = await response.json();
      setProduct(data);

      // Set the default selected color
      if (data.colors && Object.keys(data.colors).length > 0) {
        const key = Object.keys(data.colors)[0];
        setSelectedColor(key);
        setSelectedImage(data.colors[key]);
      }

      // Set the default selected color
      if (data.tires && data.tires.length > 0) {
        setSelectedTire(data.tires[0]);
      }

      setAddQuickShifter(data.quickShifter || false);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Display a loading message while waiting for the product data
  if (!product) {
    return <p>Loading...</p>;
  }

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
    setSelectedImage(product.colors[event.target.value.toLowerCase()]);
  };

  const handleTireChange = (event: any) => {
    setSelectedTire(event.target.value);
  };

  const handleQuickShifterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddQuickShifter(event.target.checked);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      brand: product.brand,
      model: product.model,
      color: selectedColor,
      tire: selectedTire,
      quickShifter: addQuickShifter,
      price: product.price
    };

    addToCart(cartItem);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className='d-flex align-items-center justify-content-center min-vh-80'>
      <Container className='mt-4'>
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <Card.Img variant='top' src={selectedImage} />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <h2>
              {product.brand} {product.model}
            </h2>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <Form.Group controlId='colorDropdown'>
              <Form.Label>Select Color</Form.Label>
              <Form.Control
                as='select'
                value={selectedColor}
                onChange={handleColorChange}
              >
                {Object.keys(product.colors).map((color) => {
                  return (
                    <option key={color} value={color}>
                      {capitalizeFirstLetter(color)}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='tiresDropdown'>
              <Form.Label>Select tires</Form.Label>
              <Form.Control
                as='select'
                value={selectedTire}
                onChange={handleTireChange}
              >
                {product.tires.map((tire) => (
                  <option key={tire} value={tire}>
                    {tire}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {product.quickShifter && (
              <Form.Check
                type='checkbox'
                id='quickShifter'
                label='Quick Shifter'
                checked={addQuickShifter}
                onChange={handleQuickShifterChange}
              />
            )}
            <Button variant='primary' onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetails;
