import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../features/productsSlice'

const AdminProducts = () => {
    
    const products = useSelector(selectProducts)

    return (
      <div>
      <h1>All Products</h1>
      <ul>
        { products && products.length 
          ? products.map((product) => (
            <div key={product.id} className="product">
              <li>
                <div>
                <span>ProductID:{product.id} - Name:{product.name} - Price: ${product.price}</span>
                <button>Edit</button>
                <button>Delete</button>
                </div>
              </li>
            </div>
          ))
        : null}
      </ul>
    </div>
  );
};

export default AdminProducts;
