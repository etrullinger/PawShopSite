import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'



// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    
    const Products = useSelector(selectProducts)

    return (
    <div>
        {Products && Products.length ? Products.map((product) =>(
            <div key={product.id} className="product" >

                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>

                <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl}/>
                </Link>

                <p>${product.price}</p>
                <p>{product.description}</p>
                <button>Add to Cart</button>
            </div>
        ))
        : null
        }
    </div>
    )
}

export default Products
