import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/store';
// import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const isAdmin = useSelector((state) => !!state.auth.me.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div id='header'>
      <div>
        <img id='logo' src="https://i.imgur.com/QpAv4b8.png" />
      </div>
      <nav>
        {(() => {
          if(isLoggedIn && !isAdmin) {
            return (
            <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/products' className='nav-link'>Shop</Link>
            <Link to="/account" className='nav-link'>Account</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
            )
          } else if(isLoggedIn && isAdmin) {
            return (
              <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/admin/products' className='nav-link'>Products</Link>
            <Link to="/admin/users" className='nav-link'>Users</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
            )
          } else {
            return (
              <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/products' className='nav-link'>Shop</Link>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/signup" className='nav-link'>Sign Up</Link>

            {/* conditional for showing guestCart vs Cart tbd... */}
            <Link to="/guestCart" className='nav-link'>
              <IconButton aria-label="cart">
                <Badge badgeContent={localStorage.cart ? JSON.parse(localStorage.cart).length : 0 } color="secondary">
                  <ShoppingCartIcon color='success' fontSize="large" />
                </Badge>
              </IconButton>
            </Link>
          </div>
            )
          }
        })()}
      </nav>
    </div>
  );
};

export default Navbar;
