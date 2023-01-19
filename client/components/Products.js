import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { selectCart, addToCartAsync } from '../features/cartSlice'
import { updateCartProductAsync } from '../features/cartProductSlice'

// Write a component to display a list of all products 
const Products = (props) => {
    // store currently selected category
    const [category, setCategory] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const cart = useSelector(selectCart);
    
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
        if(!category || category === "all") {
            return products;
        }
        return products.filter(element => element.category === category)
    }, [category, products, searchResults]);

    let uniqueCategories = [...new Set(products.map((item) => item.category))];

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
                                    <Button className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>} onClick={() => addToCart(props.userId, product.id, 1)}>Add to Cart</Button>
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