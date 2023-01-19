import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Note: Link is not a react-router-dom component. Use Link from material-ui component instead.
// import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, IconButton, InputBase, InputLabel, Link, MenuItem, Pagination, Paper, Select, TextField } from '@mui/material'
import { selectCart, addToCartAsync } from '../features/cartSlice'
import { updateCartProductAsync } from '../features/cartProductSlice'
import SearchIcon from '@mui/icons-material/Search';
import { InsertEmoticonTwoTone } from '@mui/icons-material'

// Write a component to display a list of all products
const Products = (props) => {
    // store currently selected category
    const [category, setCategory] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // store search results
    const products = useSelector(selectProducts)
    const cart = useSelector(selectCart);

    const dispatch = useDispatch();


    const handleSearch = (e) => {
        const results = products.filter(product => product.name.toLowerCase().includes(searchResults.toLowerCase()));
        setSearchResults(results);
    };

    const addToCart = async (userId, productId, quantity) => {
        var newQuantity = quantity;
        for (var product of cart) {
            if (product.productId === productId) {
                newQuantity += Number(product.quantity);
                console.log(newQuantity)
                await dispatch(updateCartProductAsync({userId, productId, quantity: newQuantity}));
                return;
            }
        }
        await dispatch(addToCartAsync({ userId, productId, quantity: newQuantity }));
    };

    // Memoized results. Re-evaluates any time selected.
    // category changes.
    const filteredData = useMemo(()=>{
        // why does the order of these two conditionals matter?
        if(typeof searchResults === "object" && searchResults.length > 0) {
            console.log("searchResults from filteredData-->", searchResults)
            return searchResults
        }

        if(!category || category === "all") {
            return products;
        }

        return products.filter(element => element.category === category)
    }, [category, products, searchResults]);

    let uniqueCategories = [...new Set(products.map((item) => item.category))];

    // Search button component to be placed in search bar. Ignore the red squiggly error for now.
    const SearchButton = () => (
        <IconButton
            type="button" sx={{ p: '10px' }}
            onClick={ (e) => handleSearch(e.target.value) }
            color={'primary'}
        >
            <SearchIcon />
        </IconButton>
    )


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

    const isLoggedIn = useSelector((state) => !!state.auth.me.id);


    return (
        <div>
            <div className='searchAndCategoryFilter'>

                <div className='search-function'>
                    <TextField
                        fullWidth
                        type="search"
                        placeholder="Search"
                        onChange={(e) => setSearchResults(e.target.value)}
                        InputProps={{endAdornment: <SearchButton />}}
                    />
                </div>

                <br/>

                <div className='category-filter'>
                    <FormControl fullWidth>
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
                </div>
            </div>


            <div className='productListingGrid_overlayWrapper'>
                <div className='product-listings_gridContainer'>
                    { filteredData.map((product) =>(
                        <div key={product.id} className='product-card'>
                            <div className='product-card_canvas'>
                                <div className='product-card-image'>
                                    <Link href={`/products/${product.id}`}>
                                        {<img className='product-image' src={product.imageUrl}/>}
                                    </Link>
                                </div>
                            </div>
                            <div >
                                <div className='product-card_content'>
                                    <div className='product-card-productName'>
                                        <Link underline="hover" href={`/products/${product.id}`} >
                                        <p className='product-name'>{product.name}</p>
                                        </Link>
                                    </div>
                                    <p> Category: {product.category}</p>
                                    <div className='product-card-productPrice'>
                                        <p className='price-display'>${product.price}</p>
                                    </div>
                                    {
                                        isLoggedIn ?
                                            <Button onClick={() => handleAddToCart2(product)} className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
                                            :
                                            <Button onClick={() => addToCart(props.userId, product.id, 1)} className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>

                                    }
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

