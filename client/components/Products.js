import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    // store currently selected category
    const [category, setCategory] = useState("");
    const products = useSelector(selectProducts)

    // Memoized results. Re-evaluates any time selected.
    // category changes.
    const filteredData = useMemo(()=>{
        if(!category || category === "all") {
            return products;
        }
        return products.filter(element => element.category === category)
    }, [category, products]);

    let uniqueCategories = [...new Set(products.map((item) => item.category))];

    return (
        <div>
            <form className='category-filter'>
                <label>Category</label>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="all" onChange={(e) => setCategory(e.target.value)}>All</option>
                    {
                        uniqueCategories.map((category) => (
                            <option onChange={(e) => setCategory(e.target.value)} key={category} value={category}>{category}</option>
                        ))
                    }
                </select>
            </form>
            <div className='productListingGrid_overlayWrapper'>
                <div className='product-listings_gridContainer'>
                    {filteredData.map((product) =>(
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
                                    <h5>{product.name}</h5>
                                    <p className='price-display'>${product.price}</p>
                                </div>
                                {/* <Button className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button> */}
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

// width={229} height={229}