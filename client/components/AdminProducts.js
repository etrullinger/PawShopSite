import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  fetchProductsAsync,
  selectProducts,
} from "../features/productsSlice";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

const AdminProducts = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProductAsync(productId));
  };

  return (
    <>
      <div>
        <span>
          <h1 align="center">All Products</h1>
          <Link to={"/admin/products/add"}>
            <Button variant="contained" className="linked-button">
              Add Product
            </Button>
          </Link>
        </span>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>NAME</b></TableCell>
              <TableCell align="center"><b>PRICE</b></TableCell>
              <TableCell align="center"><b>EDIT</b></TableCell>
              <TableCell align="center"><b>DELETE</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length
              ? products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">${product.price}</TableCell>
                    <TableCell align="center">
                      <Link to={`/admin/products/${product.id}`}>
                        <Button
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        id="delete-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminProducts;
