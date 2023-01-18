import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { selectSingleProduct } from '../features/singleProductSlice'
import { InsertEmoticonTwoTone } from '@mui/icons-material'

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    // store currently selected category
    const [category, setCategory] = useState("");
    const products = useSelector(selectProducts)

    // store search results
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        console.log("search button clicked!")
        const results = products.filter(product => product.name.toLowerCase().includes(searchResults.toLowerCase()));
        console.log("results-->", results)
        setSearchResults(results);
    }

    // Memoized results. Re-evaluates any time selected.
    // category changes.
    const filteredData = useMemo(()=>{
        if(!category || category === "all") {
            return products;
        }
        return products.filter(element => element.category === category)
    }, [category, products, searchResults]);

    let uniqueCategories = [...new Set(products.map((item) => item.category))];

    // handle add to local cart button
    // const product = useSelector(selectSingleProduct)

    const handleAddToCart2 = (item) => {
        // check in inspect: JSON.parse(localStorage.cart)
        if (!localStorage.getItem("cart")){
            // if cart does not exist in local storage, create key:val of "cart" and "[product]"
            localStorage.setItem("cart", JSON.stringify([item]))
        } else {
            // since the key: "cart" exists in local storage, grab the JSON string value array
            let cart = localStorage.getItem("cart")
            // since the value is in JSON string, parse to change back to an array
            let cartArray = JSON.parse(cart)
            // Send back to local storage with new product in string array
            localStorage.setItem("cart", JSON.stringify([...cartArray, InsertEmoticonTwoTone]))
        }
    }

    return (
        <div>
            <div>
                <TextField type="text" placeholder="Search for product..." onChange={(e) => setSearchResults(e.target.value)}/>
                <Button onClick={ () => handleSearch() } variant="contained">Search</Button>
            </div>

            <FormControl sx={{ minWidth: 220 }}  className='category-filter'>
                <InputLabel>Category</InputLabel>
                <Select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    label="Category"
                >
                    <MenuItem value="all" onChange={(e) => setCategory(e.target.value)}>All</MenuItem>
                    {
                        uniqueCategories.map((category) => (
                            <MenuItem onChange={(e) => setCategory(e.target.value)} key={category} value={category}>{category}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

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
                                    <div className='product-card-productName'>
                                        <Link to={`/products/${product.id}`}>
                                        <h5 className='product-name'>{product.name}</h5>
                                        </Link>
                                    </div>
                                    <div className='product-card-productPrice'>
                                        <p className='price-display'>${product.price}</p>
                                    </div>
                                    <Button onClick={()=> handleAddToCart2(product)} className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
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
