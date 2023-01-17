import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const Account = (props) => {
  const firstName = useSelector((state) => state.auth.me.firstName);

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <div>
        <Link to="/account/orders" className='nav-link'>Order History</Link>
        <Link to={`/account/cart/${props.userId}`} className='nav-link'>Cart</Link>
      </div>
    </div>
  );
};

export default Account;
