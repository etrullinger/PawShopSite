import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import { selectProducts } from '../features/productsSlice'


// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    
    const Products = useSelector(selectProducts)

    // const dispatch = useDispatch()

    // const handleAddToCart = async (productId) => {
    //     try{
    //         await dispatch(addProductToCartAsync(productId))
    //     } catch(error){
    //         throw(error)
    //     }
    // };

    return (
    <div>
        {Products && Products.length ? Products.map((product) =>(
            <div key={product.id} className="product" >

                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>

                <Link to={`/products/${product.id}`}>
                    <Avatar alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
                </Link>

                <p>${product.price}</p>
                <p>{product.description}</p>

                <Button onClick={()=> handleAddToCart(product.id)} variant="outlined" color="primary">
                    Add to Cart 🛒
                </Button>
            </div>
        ))
        : null
        }
    </div>
    )
}

export default Products
