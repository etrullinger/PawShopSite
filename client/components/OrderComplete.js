import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const OrderComplete = (props) => {
  const firstName = useSelector((state) => state.auth.me.firstName);

  return (
    <div>
      <h3 align="center">Thank you, {firstName}! Your order is completed!</h3>
    </div>
  );
};

export default OrderComplete;
