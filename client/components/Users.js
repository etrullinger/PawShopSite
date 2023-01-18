import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "../features/usersSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1 align="center">All Users</h1>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>USER ID#</b>
              </TableCell>
              <TableCell align="center">
                <b>FIRST NAME</b>
              </TableCell>
              <TableCell align="center">
                <b>LAST NAME</b>
              </TableCell>
              <TableCell align="center">
                <b>EMAIL</b>
              </TableCell>
              <TableCell align="center">
                <b>PAYMENT TYPE</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length
              ? users.map((user) => (
                  <TableRow key={user.id} className="user">
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center"><img className="paymentMethods" src="https://casscourtsmi.org/wp-content/uploads/2019/04/credit-cards.png"></img></TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
