import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    const products = useSelector(selectProducts)

    const [productsData, setProductsData] = useState([]);
    const [productSearchData, setProductSearchData] = useState([]);
    const [name, setName] = useState('');

    React.useEffect(()=>{
        setProductsData(products)
        setProductSearchData(products)
    }, [name, products])

    const handleSearch = () => {
        console.log("search button clicked")
        const newData = productsData.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()))
        setProductSearchData(newData)
    };

    return (
        <div>
            <div>
                <TextField type='text' placeholder='Search product...' onChange={(e)=> setName(e.target.value) }/>
                <Button variant='contained' onClick={()=> handleSearch()}>Search</Button>
            </div>
            <div className='productListingGrid_overlayWrapper'>
                <div className='product-listings_gridContainer'>
                    {productSearchData.map((product) =>(
                        <div key={product.id} className='product-card'>
                            <div className='product-card_canvas'>
                                <div className='product-card-image'>
                                    <Link to={`/products/${product.id}`}>
                                        {<img className='product-image' src={product.imageUrl}/>}
                                    </Link>
                                </div>
                            </div>
                            <div >
                                <div className='product-card_content'>
                                    <div className='product-card-productName'>
                                        <Link to={`/products/${product.id}`}>
                                        <h5 className='product-name'>{product.name}</h5>
                                        </Link>
                                    </div>
                                    <div className='product-card-productPrice'>
                                        <p className='price-display'>${product.price}</p>
                                    </div>
                                    <Button className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Products