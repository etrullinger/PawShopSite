import { IconButton, InputBase, Paper } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/productsSlice';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const [searchResults, setSearchResults] = useState("");  
    const products = useSelector(selectProducts)

    const handleSearch = () => {
        // console.log("search button clicked!")
        const results = products.filter(product => product.name.toLowerCase().includes(searchResults.toLowerCase()));
        // console.log("results from handleSearch-->", results)
        setSearchResults(results);
    }
    
    return (
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
    )
}

export default SearchBar