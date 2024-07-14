import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStart, productSelector, productsAsyncThunk } from '../redux/Reducers/productReducer'
import Product from '../components/Product'
import { notificationSelector, clearMessage } from '../redux/Reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
import { fetchCartItemsAsyncThunk } from '../redux/Reducers/cartReducer'


function ProductList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, products, error } = useSelector(productSelector);
  const { message } = useSelector(notificationSelector)
  const [showToast, setShowToast] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    dispatch(fetchStart())
    dispatch(productsAsyncThunk())
    dispatch(fetchCartItemsAsyncThunk())
  }, [dispatch])

  useEffect(() => {
    if (message) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        dispatch(clearMessage())
      }, 1000); // Hide after 1 second

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleSort = (key, order) => {
    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedProducts(sorted);
    setIsSorted(true);
  };

  const handleCancelSort = () => {
    setSortedProducts(products);
    setIsSorted(false);
  };

  return (
    <div className='mt-4'>
      {showToast && (
        <div
          className="toast show position-fixed top-0 end-0 p-3"
          style={{ zIndex: 11, top: '20px', right: '20px' }}
        >
          <div className="toast-body">
            {message}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary ms-2" onClick={() => navigate('/addProduct')}>
          Add Product
        </button>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => handleSort('price', 'asc')}>
            Sort by Price Asc <FontAwesomeIcon icon={faSortNumericDown} />
          </button>
          <button className="btn btn-outline-secondary me-2" onClick={() => handleSort('price', 'desc')}>
            Sort by Price Desc <FontAwesomeIcon icon={faSortNumericUp} />
          </button>
          {isSorted && (
            <button className="btn btn-warning" onClick={handleCancelSort}>
              Cancel Sort
            </button>
          )}
        </div>
      </div>
      { error ? <div> {error} </div> :
       isLoading ? 
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div> :
      <Product isSorted={isSorted} sortedProducts={sortedProducts}/> }
    </div>
  )
}

export default ProductList