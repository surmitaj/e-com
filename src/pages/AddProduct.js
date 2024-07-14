import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProductAsyncThunk } from '../redux/Reducers/productReducer';

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    image: '',
    description: '',
    category: '',
    price: '',
    quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      id: Math.floor(100 + Math.random() * 900) // Generate random 3-digit ID
    };

    dispatch(addProductAsyncThunk(newProduct))
    .then(() => {
        navigate('/'); // Navigate back to the product list or desired route
    })
    .catch((error) => {
        console.error('Failed to add product:', error);
    });
  };

  return (
    <div className="container mt-4">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}

export default AddProduct;
