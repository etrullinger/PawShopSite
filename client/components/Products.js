import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Note: Link is not a react-router-dom component. Use Link from material-ui component instead.
// import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'
import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormControl, IconButton, InputBase, InputLabel, Link, MenuItem, Pagination, Paper, Select, TextField } from '@mui/material'
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

    // // use useState() to store the current page number
    // const [currentPage, setCurrentPage] = useState(1);


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
    // const handleChange = (e, p) => {
    //     // console.log(e, p)
    //     console.log("e--> ", e)
    //     console.log("p--> ", p)

    //     setCurrentPage(p)
    // }

    // const pageSize = 10;


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
                                    <Button className='add-to-cart-button' variant='contained' endIcon={<AddShoppingCartIcon/>}>Add to Cart</Button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
            {/* <h1>Current page is {currentPage}</h1>
            <Pagination 
                count={10} 
                color="primary"
                onChange={handleChange}
            >
            </Pagination> */}
        </div>
    )
}

export default Products