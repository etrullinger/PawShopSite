import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    
    const products = useSelector(selectProducts);

    return (
    <div>
        {products && products.length ? products.map((product) =>(
            <div key={`product: ${product.id}`} className="product" >

                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>

                <Link to={`/products/${product.id}`}>
                    <img alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
                </Link>

                <p>${product.price}</p>
                <p>{product.description}</p>

            </div>
        ))
        : null
        }
    </div>
    )
}

export default Products
