import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, removeFromCartAsyncThunk } from '../redux/Reducers/cartReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { clearMessage ,notificationSelector } from '../redux/Reducers/notificationReducer';

function CartList() {
  const { items, totalPrice } = useSelector(cartSelector);
  const { message } = useSelector(notificationSelector)
  const [showToast, setShowToast] = useState(false)
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCartAsyncThunk(id));
  };

  useEffect(() => {
    if (message) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        dispatch(clearMessage())
      }, 2000); // Hide after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <div className="container">
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
      <h2 className="my-4">Your Cart Items:</h2>
      {items.length === 0 ? (
        <div className="text-center mt-5">
          <FontAwesomeIcon icon={faSadTear} size="4x" className="text-muted mb-3" />
          <p className="lead">Your cart feels light, please add some products.</p>
        </div>
      ) : (
        <div className="d-flex flex-row flex-wrap">
          {items.map((item) => (
            <div className="card mb-4 me-4" key={item.id}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><strong>Price:</strong> ${item.price}</p>
                    <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                    <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length > 0 && (
          <div className="w-100 py-3 border-top mt-auto bg-light">
            <div className="container">
              <h4 className="text-center">Total Price: ₹{totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        )}
        </div>
      )}
    </div>
  );
}

export default CartList;
