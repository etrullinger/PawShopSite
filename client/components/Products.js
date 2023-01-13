import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'

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
        <form>
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

        {filteredData.map((product) =>(
            <div key={product.id} className="product" >
                <div>
                    <h3>{product.name}</h3>
                    <p>Category: {product.category}</p>

                    <Link to={`/products/${product.id}`}>
                        <img src={product.imageUrl}/>
                    </Link>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <button>Add to Cart</button> 
                </div>
            </div>
        ))
        
        }
        
    </div>
    )
}

export default Products
