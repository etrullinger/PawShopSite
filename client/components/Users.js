import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "../features/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>All Users</h1>
      <table class="table">
        <thead>
          <tr>
            <th>User ID#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {users && users.length
          ? users.map((user) => (
              <tr key={user.id} className="user">
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>   
              </tr>
            ))
          : null}
          </tbody>
      </table>
    </div>
  );
};

export default Users;
