import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import '../../styles/ProductList.css';

interface Product {
  id: string;
  brand: string;
  model: string;
  colors: { [key: string]: string };
  quickShifter: boolean;
  price: number;
  capacity: number;
  image: string;
}

interface Filters {
  brand: string;
  color: string;
  quickShifter: string;
  minPrice: string;
  maxPrice: string;
  minCapacity: string;
  maxCapacity: string;
}

const FILTERS: Filters = {
  brand: '',
  color: '',
  quickShifter: '',
  minPrice: '',
  maxPrice: '',
  minCapacity: '',
  maxCapacity: ''
};

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>(FILTERS);

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/products');
      const data: Product[] = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters(FILTERS);
  };

  const applyFilters = () => {
    // Implement your filtering logic based on filters state
    const filtered = allProducts.filter((product) => {
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      if (
        filters.color &&
        !Object.keys(product.colors).includes(filters.color)
      ) {
        return false;
      }
      if (
        filters.quickShifter !== '' &&
        product.quickShifter !== (filters.quickShifter === 'true')
      ) {
        return false;
      }
      if (
        filters.minPrice !== '' &&
        parseFloat(product.price.toString()) < parseFloat(filters.minPrice)
      ) {
        return false;
      }
      if (
        filters.maxPrice !== '' &&
        parseFloat(product.price.toString()) > parseFloat(filters.maxPrice)
      ) {
        return false;
      }
      if (
        filters.minCapacity !== '' &&
        parseFloat(product.capacity.toString()) <
          parseFloat(filters.minCapacity)
      ) {
        return false;
      }
      if (
        filters.maxCapacity !== '' &&
        parseFloat(product.capacity.toString()) >
          parseFloat(filters.maxCapacity)
      ) {
        return false;
      }
      return true;
    });
    setFilteredProducts(filtered);
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getColors = (): string[] => {
    return [
      ...new Set(
        allProducts.reduce(
          (acc: string[], product) => [...acc, ...Object.keys(product.colors)],
          []
        )
      )
    ];
  };

  return (
    <Container fluid>
      <Row>
        {/* Filter Form Column */}
        <Col md={3} className='filter-column'>
          <h2 className='mt-4 mb-4'>Filters</h2>
          <Form>
            <Form.Group controlId='brandFilter' className='mb-3'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as='select'
                name='brand'
                value={filters.brand}
                onChange={handleFilterChange}
              >
                <option value=''>All Brands</option>
                <option value='Yamaha'>Yamaha</option>
                <option value='BMW'>BMW</option>
                <option value='Harley-Davidson'>Harley-Davidson</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='colorFilter' className='mb-3'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                as='select'
                name='color'
                value={filters.color}
                onChange={handleFilterChange}
              >
                <option value=''>All Colors</option>
                {getColors().map((color, index) => (
                  <option key={index} value={color}>
                    {capitalizeFirstLetter(color)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='quickShifterFilter' className='mb-3'>
              <Form.Label>Quick Shifter</Form.Label>
              <Form.Control
                as='select'
                name='quickShifter'
                value={filters.quickShifter}
                onChange={handleFilterChange}
              >
                <option value=''>All</option>
                <option value='true'>QuickShifter</option>
                <option value='false'>Non-QuickShifter</option>
              </Form.Control>
            </Form.Group>

            <Row className='mb-3'>
              <Col>
                <Form.Group controlId='minPrice'>
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter min price'
                    name='minPrice'
                    value={filters.minPrice}
                    onInput={(e) => {
                      const value = parseInt(e.currentTarget.value);
                      if (value < 0) {
                        e.currentTarget.value = '0';
                      }
                    }}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='maxPrice'>
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter max price'
                    name='maxPrice'
                    value={filters.maxPrice}
                    onInput={(e) => {
                      const value = parseInt(e.currentTarget.value);
                      if (value < 0) {
                        e.currentTarget.value = '0';
                      }
                    }}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <Form.Group controlId='minCapacity'>
                  <Form.Label>Min Capacity</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter min capacity'
                    name='minCapacity'
                    value={filters.minCapacity}
                    onInput={(e) => {
                      const value = parseInt(e.currentTarget.value);
                      if (value < 0) {
                        e.currentTarget.value = '0';
                      }
                    }}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='maxCapacity'>
                  <Form.Label>Max Capacity</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter max capacity'
                    name='maxCapacity'
                    value={filters.maxCapacity}
                    onInput={(e) => {
                      const value = parseInt(e.currentTarget.value);
                      if (value < 0) {
                        e.currentTarget.value = '0';
                      }
                    }}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col xs={12}>
                <Button
                  variant='primary'
                  type='button'
                  onClick={applyFilters}
                  className='mr-2'
                  style={{ marginRight: '8px' }}
                >
                  Apply Filters
                </Button>
                <Button variant='danger' onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        {/* Product List Column */}
        <Col md={9}>
          <h2 className='mt-4 mb-4'>Product List</h2>
          <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <Link to={`/products/${product.id}`} className='product-link'>
                  <Card>
                    <Card.Img variant='top' src={product.image} />
                    <Card.Body>
                      <Card.Title>
                        {product.brand} {product.model}
                      </Card.Title>
                      <Card.Text>${product.price.toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export const Dashboard = () => <ProductList />;
