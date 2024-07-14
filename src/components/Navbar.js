import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { cartSelector } from '../redux/Reducers/cartReducer';

function NavigationBar() {
  const { totalItems } = useSelector(cartSelector)
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faHome} /> Ecom App
        </Link>
        <Link className="navbar-brand" to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} /> {totalItems > 0 && <span className="badge bg-danger">{totalItems}</span>}
        </Link>
      </nav>
      <Outlet/>
    </div>
  );
}

export default NavigationBar;
