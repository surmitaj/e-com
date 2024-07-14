import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productSelector } from '../redux/Reducers/productReducer';
import { addToCartAsyncThunk } from '../redux/Reducers/cartReducer'

function Product({isSorted, sortedProducts}) {
  const { products } = useSelector(productSelector);
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addToCartAsyncThunk({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1
    }))
  }

  return (
    <div className="container">
      <div className="row">
        {(isSorted ? sortedProducts : products).map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product