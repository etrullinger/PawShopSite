import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Account = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <div>
        <Link to="/account/orders" className='nav-link'>Order History</Link>
      </div>
    </div>
  );
};

export default Account;
