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
      <ol>
        {users && users.length
          ? users.map((user) => (
              <div key={user.id} className="user">
                <li>
                  <p>
                    UserID: {user.id}, Name:{" "}
                    {`${user.firstName} ${user.lastName}`}, Email: {user.email}
                  </p>
                </li>
              </div>
            ))
          : null}
      </ol>
    </div>
  );
};

export default Users;
