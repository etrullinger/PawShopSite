import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, IconButton, InputBase, InputLabel, MenuItem, Pagination, Paper, Select, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    // store currently selected category
    const [category, setCategory] = useState("");

    // store search results
    const [searchResults, setSearchResults] = useState("");  
    // console.log("searchResults from outside of any function-->", searchResults)
    // console.log("typeof searchResults-->", typeof searchResults)
    // console.log("searchResults.length-->", searchResults.length)

    const products = useSelector(selectProducts)

    const handleSearch = () => {
        // console.log("search button clicked!")
        const results = products.filter(product => product.name.toLowerCase().includes(searchResults.toLowerCase()));
        // console.log("results from handleSearch-->", results)
        setSearchResults(results);
    }

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

    // handle change for pagination
    const handleChange = (e, p) => {
        // console.log(e, p)
        console.log("e--> ", e)
        console.log("p--> ", p)
    }

    return (
        <div>
            <div className='searchAndCategoryFilter'>

                <div className='search-function'>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
                    >
                        <InputBase 
                            sx={{ ml: 1, flex: 1 }}
                            type="search" 
                            placeholder="Search" 
                            onChange={(e) => {
                                setSearchResults(e.target.value)
                                // handleSearch(e.target.value)
                            }}
                        />
                        <IconButton
                            type="button" sx={{ p: '10px' }} 
                            onClick={ (e) => handleSearch(e.target.value) }
                            color={'primary'}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>

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
            <Pagination 
                count={10} 
                color="primary"
                onChange={handleChange}
            >

            </Pagination>
        </div>
    )
}

export default Products