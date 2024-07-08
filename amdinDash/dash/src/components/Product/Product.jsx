import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css'; 

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); 
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`); 
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="product-container">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <span>{product.name}</span>
            <span>{product.price}</span>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
        
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
